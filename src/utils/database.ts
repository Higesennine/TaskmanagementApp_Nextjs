import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI || '')
        console.log("connected DB")
    } catch (error) {
        console.log('Fail to connect with DB:', error);
        throw new Error();
    }
}