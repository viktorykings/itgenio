import React from 'react'
import Room from './Room';
import { RoomListProps } from '../../types.ts/TRoom';


const RoomsList = ({ rooms, selectedRoom, onSelectRoom }: RoomListProps) => {
    return (
        <div className='rooms-list'>
            {rooms.map((el, i) => <Room key={rooms[i]._id} room={el} selectedRoom={selectedRoom} onSelectRoom={onSelectRoom} />)}
        </div>
    )
}

export default RoomsList