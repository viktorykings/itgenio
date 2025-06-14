import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "./RoomsCollection";

Meteor.publish("rooms", () => {
  return RoomsCollection.find();
});
