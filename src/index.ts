import express from "express";
import dotenv from "dotenv";
import connection from "./connection/dbConnection";
import postModel from "./model/post.model";
import postRouter from "./routes/post.routes";

const app = express();

dotenv.config();
connection();
app.use(express.json());
app.use("/posts", postRouter);
// const once = async () => {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();
//     postModel.create(data);
//   } catch (error) {}
// };

// // once();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server listening on port");
});
