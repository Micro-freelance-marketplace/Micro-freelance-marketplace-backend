import Application from "../model/Application.model.js";
import Gig from "../models/gig.model.js";
export const applyToGig = async (req, res) => {
  try {
    const gigId = req.params.id;
    const userId = req.user.id;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Prevent applying to own gig (IMPORTANT: your schema)
    if (gig.owner.id.toString() === userId) {
      return res.status(400).json({ message: "You cannot apply to your own gig" });
    }

    //  Prevent duplicate
    const existing = await Application.findOne({
      gigId,
      applicantId: userId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      gigId,
      applicantId: userId,
      coverLetter: req.body.coverLetter,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getApplications = async (req, res) => {
  try {
    const gigId = req.params.id;
    const userId = req.user.id;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    //  Only owner can see
    if (gig.owner.id.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const applications = await Application.find({ gigId })
      .populate("applicantId", "name email");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user.id;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.id).populate("gigId");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const gig = application.gigId;

    // Only owner
    if (gig.owner.id.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    //  Status machine
    if (application.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicantId: req.user.id,
    })
      .populate("gigId")
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};