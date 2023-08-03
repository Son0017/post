import { Schema, model } from "mongoose";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const schema = new Schema<IPost>({
  userId: { type: Number, required: true },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

const postModel = model<IPost>("post", schema);

export default postModel;
