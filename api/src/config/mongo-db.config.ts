import mongoose from "mongoose"

export const mongooseConnection = async () => {
    mongoose.connect(`${process.env.MONGODB_URI}`)
}