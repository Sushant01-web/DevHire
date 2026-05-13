import mongoose from "mongoose"

/* Function to connect with DB */
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined")
        }

        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb is connected: ${connection.connection.host}`)

    } catch (error) {
        console.log("MongoDB Error: ", error.message)
        process.exit(1)
    }
}
export default connectDB;