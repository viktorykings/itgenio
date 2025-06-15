import React, { useEffect, useRef, useState } from 'react';
import { CanvasProp } from '/imports/types.ts/TRoom';

interface Sector {
    x: number;
    y: number;
    color: string;
    active: boolean;
}

const Canvas = ({ room }: CanvasProp) => {
    const { _id, canvasData } = room
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [gridSize] = useState({ rows: 10, cols: 10 });

    useEffect(() => {
        if (canvasData) {
            setSectors(JSON.parse(canvasData));
        } else {
            const newSectors: Sector[] = [];

            for (let y = 0; y < gridSize.rows; y++) {
                for (let x = 0; x < gridSize.cols; x++) {
                    newSectors.push({
                        x,
                        y,
                        color: '#fff',
                        active: false
                    });
                }
            }
            setSectors(newSectors);
        }
    }, [gridSize, _id]);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const sectorWidth = canvas.width / gridSize.cols;
        const sectorHeight = canvas.height / gridSize.rows;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sectors.forEach(sector => {
            ctx.fillStyle = sector.active ? '#000' : sector.color;
            ctx.fillRect(
                sector.x * sectorWidth,
                sector.y * sectorHeight,
                sectorWidth,
                sectorHeight
            );

            ctx.strokeStyle = '#ddd';
            ctx.strokeRect(
                sector.x * sectorWidth,
                sector.y * sectorHeight,
                sectorWidth,
                sectorHeight
            );
        });
        const newData = JSON.stringify(sectors)

        Meteor.call('rooms.updateCanvas', _id, newData, (error: any) => {
            if (error) console.error('Error saving canvas:', error);
        });
    }, [sectors, gridSize]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault()
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const sectorWidth = canvas.width / gridSize.cols;
        const sectorHeight = canvas.height / gridSize.rows;

        const clickedCol = Math.floor(x / sectorWidth);
        const clickedRow = Math.floor(y / sectorHeight);

        setSectors(prev => prev.map(sector => {
            if (sector.x === clickedCol && sector.y === clickedRow) {
                return { ...sector, active: !sector.active };
            }
            return sector;
        }));

    };

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