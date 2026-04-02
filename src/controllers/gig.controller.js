import Gig from "../models/gig.model.js";

export const createGig = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const { title, description, budget, category, deadline } = req.body;
    if (!title || !description || !budget?.amount || !category || !deadline) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }
      const newGig = new Gig({
        title,
        description,
        budget,
        category,
        deadline,
        owner: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
  
  const savedGig = await newGig.save();
    res.status(201).json(
        {
            success: true,
            message: "Gig created successfully",
            data: savedGig,
        }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGigs = async (req, res) => {
  try { 
    const { search, category,  page = 1, limit = 10  } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (category) {
    query.category = category;
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Gig.countDocuments(query);

  const gigs = await Gig.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
  res.status(200).json({
    success: true,
    meta: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      count: gigs.length,
    },
    data: gigs,
  });
  } catch (error) {
    res.status(500).json({  
        success: false,
        message: "Error fetching gigs",
        error: error.message, });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    res.status(200).json({
      success: true,
      data: gig,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateGig = async (req, res) => {
  try {
    const {id} = req.params;
    const userId = req.user?.id;

    const gig = await Gig.findById(id);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    if (gig.owner.id.toString() !== userId) {
        return res.status(403).json({
          message: "Not authorized to update this gig",
        });
      }

      const allowedFields = [
        "title",
        "description",
        "budget",
        "category",
        "deadline",
        "status",
      ];
  
      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          gig[field] = req.body[field];
        }
      });
      const updatedGig = await gig.save();
    res.status(200).json({
      success: true,
      message: "Gig updated successfully",
      data: updatedGig,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGig = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
  
      const gig = await Gig.findById(id);
  
      if (!gig) {
        return res.status(404).json({
          message: "Gig not found",
        });
      }

      if (gig.owner.id.toString() !== userId) {
        return res.status(403).json({
          message: "Not authorized to delete this gig",
        });
      }

      gig.status = "closed";
      const closedGig = await gig.save();
  
      res.status(200).json({
        message: "Gig closed (soft deleted) successfully",
        data: closedGig,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error closing gig",
        error: error.message,
      });
    }
  };