import { Request, Response } from "express";
import postModel from "../model/post.model";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page: any = req.params.id;
    const skip = page * 1 - 1;
    const posts = await postModel.find(
      {},
      { __v: 0, _id: 0 },
      { sort: { id: 1 }, skip: skip * 10, limit: 10 }
    );
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const queryKeys = Object.keys(query);
    let newlike: any = {};
    let newsort: any = {};
    let limit: any = query.limit;
    let skip: any = query.skip;
    newsort.limit = query.limit ? limit * 1 : 10;
    newsort.skip = query.skip ? skip * 1 : 0;

    for (let i = 0; i < queryKeys.length; i++) {
      if (queryKeys[i] === "like") {
        newlike[`$or`] = [
          { title: { $regex: query[queryKeys[i]], $options: "i" } },
          { body: { $regex: query[queryKeys[i]], $options: "i" } },
        ];
      } else {
        newsort.sort = {};
        newsort.sort[queryKeys[i]] = query[queryKeys[i]];
      }
    }
    const data = await postModel.find(newlike, {}, newsort);

    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
