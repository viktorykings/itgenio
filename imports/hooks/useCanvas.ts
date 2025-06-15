import { useState, useRef, useCallback, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useDebouncedCallback } from "use-debounce";

interface Sector {
  x: number;
  y: number;
  color: string;
  active: boolean;
}

interface UseCanvasProps {
  roomId: string;
  initialCanvasData?: string;
  gridSize?: { rows: number; cols: number };
  canvasSize?: { width: number; height: number };
}

const useCanvas = ({
  roomId,
  initialCanvasData,
  gridSize = { rows: 10, cols: 10 },
  canvasSize = { width: 500, height: 500 },
}: UseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const { rows, cols } = gridSize;

  const initializeGrid = useCallback(() => {
    const newSectors: Sector[] = [];
    for (let y = 0; y < gridSize.rows; y++) {
      for (let x = 0; x < gridSize.cols; x++) {
        newSectors.push({
          x,
          y,
          color: "#ffffff",
          active: false,
        });
      }
    }
    return newSectors;
  }, [rows, cols]);

  useEffect(() => {
    if (initialCanvasData) {
      try {
        setSectors(JSON.parse(initialCanvasData));
      } catch {
        setSectors(initializeGrid());
      }
    } else {
      setSectors(initializeGrid());
    }
  }, [initialCanvasData, initializeGrid]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sectorWidth = canvas.width / gridSize.cols;
    const sectorHeight = canvas.height / gridSize.rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sectors.forEach((sector) => {
      ctx.fillStyle = sector.active ? "#000000" : sector.color;
      ctx.fillRect(
        sector.x * sectorWidth,
        sector.y * sectorHeight,
        sectorWidth,
        sectorHeight
      );

      ctx.strokeStyle = "#dddddd";
      ctx.strokeRect(
        sector.x * sectorWidth,
        sector.y * sectorHeight,
        sectorWidth,
        sectorHeight
      );
    });
  }, [sectors, rows, cols]);

  const saveCanvasState = useDebouncedCallback(
    async (currentSectors: Sector[]) => {
      const data = JSON.stringify(currentSectors);
      try {
        await Meteor.callAsync("rooms.updateCanvas", roomId, data);
      } catch (err) {
        console.error("Failed to update", err);
      }
    },
    500
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const sectorWidth = canvas.width / gridSize.cols;
      const sectorHeight = canvas.height / gridSize.rows;

      const clickedCol = Math.floor(x / sectorWidth);
      const clickedRow = Math.floor(y / sectorHeight);

      setSectors((prev) => {
        const newSectors = prev.map((sector) => ({
          ...sector,
          active:
            sector.x === clickedCol && sector.y === clickedRow
              ? !sector.active
              : sector.active,
        }));

        drawCanvas();
        saveCanvasState(newSectors);
        return newSectors;
      });
    },
    [gridSize, drawCanvas, saveCanvasState]
  );

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  return {
    canvasRef,
    sectors,
    handleCanvasClick,
    canvasSize,
    gridSize,
    redraw: drawCanvas,
  };
};

export default useCanvas;
