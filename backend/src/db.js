import mongoose from "mongoose";

const connectdb = async () => {
  try {
    mongoose.connect(process.env.mongodb).then(() => {
      console.log("connected to data base");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectdb;
