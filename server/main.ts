import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "/imports/api/RoomsCollection";
import "../imports/api/RoomsPublication";
import "../imports/api/roomsMethods";
import { Room } from "/imports/types.ts/TRoom";

const initialState = [
  {
    title: "Room 1",
    canvasData: "",
  },
  {
    title: "Room 2",
    canvasData: "",
  },
  {
    title: "Room 3",
    canvasData: "",
  },
];

type insertData = Pick<Room, "title" | "canvasData">;

const insertRoom = ({ title, canvasData }: insertData) => {
  RoomsCollection.insertAsync({
    title,
    canvasData,
    createdAt: new Date(),
  });
};

Meteor.startup(async () => {
  if ((await RoomsCollection.find().countAsync()) === 0) {
    initialState.forEach((el) =>
      insertRoom({ title: el.title, canvasData: el.canvasData })
    );
  }
});
