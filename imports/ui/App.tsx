import React from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import Canvas from './Canvas';
import { RoomsCollection } from '../api/RoomsCollection';
import Room from './Room';
// import { TaskCollection } from '../api/TaskCollection';

const App = () => {
  // const tasks = useTracker(() => TaskCollection.find({}).fetch());
  const isLoading = useSubscribe('rooms')
  const rooms = useTracker(() => RoomsCollection.find({}).fetch())
  console.log(rooms)

  if (isLoading()) return <p>loading...</p>
  return (
    <div>
      {rooms.map(room => <Room key={room._id} room={room} />)}
    </div>
  );
};

export default App;