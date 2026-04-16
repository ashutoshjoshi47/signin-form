import mongoose from "mongoose";

const connectDB = async() => {
    mongoose.connection.on('connected', ()=> {
        console.log("connection successful");
    })

    await mongoose.connect(`${process.env.MONGO_URI}/form`)
}

export default connectDB;

