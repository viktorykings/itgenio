import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "./RoomsCollection";
import { Room } from "../types.ts/TRoom";

Meteor.methods({
  "rooms.insert"(doc: Room) {
    return RoomsCollection.insertAsync(doc);
  },
  "rooms.updateCanvas"(_id, canvasData) {
    return RoomsCollection.updateAsync(_id, {
      $set: { canvasData },
    });
  },
  "rooms.delete"(_id) {
    return RoomsCollection.removeAsync(_id);
  },
});
