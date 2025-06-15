export interface Room {
  _id: string;
  title: string;
  canvasActive: boolean;
  //   createdAt: Date;
}

export interface RoomListProps {
  rooms: Room[];
  selectedRoom: Room | null;
  onSelectRoom: (room: Room) => void;
}

export type RoomProp = Pick<RoomListProps, "onSelectRoom" | "selectedRoom"> & {
  room: Room;
};
