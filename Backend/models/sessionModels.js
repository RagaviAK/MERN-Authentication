import mongoose from "mongoose";

const sessionSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        deviceName:{
            type:String,
            required:true
        },
         browserName:{
            type:String,
            required:true
        },
         loginTime: {
            type: Date,
            default: Date.now,
        },

        lastActive: {
            type: Date,
            default: Date.now,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

    });
sessionSchema.index({ userId: 1 });

const sessionModel=mongoose.model('Session',sessionSchema);
export default sessionModel;