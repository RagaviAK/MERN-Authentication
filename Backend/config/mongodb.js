import mongoose from "mongoose";

const connect=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Mongoose connected")
    })
await mongoose.connect(process.env.MONGODB_URL);
}
export default connect;


const mongoose=require('mongoose');

const connect=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('mongoose connected');

    })
    await mongoose.connect(process.env.MONGODB_URL)
}

module.export=connect