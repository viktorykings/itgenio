import React, { useEffect, useRef, useState } from 'react';
import { CanvasProp } from '/imports/types.ts/TRoom';
import useCanvas from '/imports/hooks/useCanvas';

const Canvas = ({ room }: CanvasProp) => {
    const { canvasRef, handleCanvasClick } = useCanvas({
        roomId: room._id,
        initialCanvasData: room.canvasData,
        gridSize: { rows: 10, cols: 10 },
        canvasSize: { width: 500, height: 500 }
    });

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                onClick={handleCanvasClick}
            />
        </div>
    );
};

export default Canvas;