import { Mongo } from "meteor/mongo";

export const RoomsCollection = new Mongo.Collection<Room>("rooms");

export interface Room {
  _id: string;
  title: string;
  canvasActive: boolean;
  //   createdAt: Date;
}
