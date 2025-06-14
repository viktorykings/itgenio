import { Mongo } from "meteor/mongo";

// export const LinksCollection = new Mongo.Collection("links");
export interface Link {
  _id: string;
  title: string;
  url: string;
  createdAt: Date;
}

export const LinksCollection = new Mongo.Collection<Link>("links");
