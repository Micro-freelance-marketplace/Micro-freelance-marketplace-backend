import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:Number,required:true},
        role:{type:String,enum:["freelancer","poster"],default:"freelancer"},
        campus:{type:String,required:true}
    },{timestamps:true}
);
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});