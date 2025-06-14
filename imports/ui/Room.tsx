import React from 'react'
import { Room as RoomType } from '../api/RoomsCollection'
import Canvas from './Canvas'

interface RoomProp {
    room: RoomType
}

const Room = ({ room }: RoomProp) => {
    return (
        <div>
            <h4>{room.title}</h4>
            {/* {room.canvasActive && <Canvas />} */}
        </div>
    )
}

export default Room