import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "/imports/api/RoomsCollection";
import "../imports/api/RoomsPublication";
import "../imports/api/roomsMethods";

const insertRoom = (roomTitle: string) => {
  RoomsCollection.insertAsync({ title: roomTitle, canvasActive: false });
};

Meteor.startup(async () => {
  if ((await RoomsCollection.find().countAsync()) === 0) {
    ["Room 1", "Room 2", "Room 3"].forEach((el) => insertRoom(el));
  }
});
