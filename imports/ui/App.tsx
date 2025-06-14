import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Canvas from './Canvas';
// import { TaskCollection } from '../api/TaskCollection';

const App = () => {
  // const tasks = useTracker(() => TaskCollection.find({}).fetch());

  return (
    <div>
      <Canvas />
    </div>
  );
};

export default App;