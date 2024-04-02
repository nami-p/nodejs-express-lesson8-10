import * as mongoose from "mongoose";

export default function () {
  // connect to db
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("mongo db connected"))
    .catch((err) => console.log(err.message));
}
