import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "./RoomsCollection";

Meteor.methods({
  "rooms.insert"(doc) {
    return RoomsCollection.insertAsync(doc);
  },
});
