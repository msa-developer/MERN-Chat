import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongodb).then(() => {
      console.log("connected to : ");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectdb;
