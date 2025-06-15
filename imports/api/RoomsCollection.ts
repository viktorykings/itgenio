import { Mongo } from "meteor/mongo";
import { Room } from "../types.ts/TRoom";

export const RoomsCollection = new Mongo.Collection<Room>("rooms");
