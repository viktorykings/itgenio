import React, { useState } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { RoomsCollection } from '../api/RoomsCollection';
import RoomsList from './rooms/RoomsList';
import { Room } from '../types.ts/TRoom';
import Canvas from './canvas/Canvas';
import Form from './Form';

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const isLoading = useSubscribe('rooms')
  const rooms = useTracker(() => RoomsCollection.find({}).fetch())

  const currentRoom = useTracker(() => {
    if (!selectedRoom) return null;
    return RoomsCollection.findOne(selectedRoom._id);
  });

  if (isLoading()) return <p>loading...</p>
  return (
    <div className="room-page">
      <div className="room-list-container">
        <Form />
        <RoomsList
          rooms={rooms}
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
        />
      </div>

      <div className="room-canvas-container">
        {currentRoom ? (
          <Canvas
            room={currentRoom}
          />
        ) : (
          <div className="no-room-selected">
            <p>Выберите комнату</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;