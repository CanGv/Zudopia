// frontend/src/pages/RoomPage.jsx

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL);

export default function RoomPage() {
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit("joinRoom", { roomId });
    socket.on("userJoined", (data) => {
      console.log("A user joined:", data.userId);
    });
  }, [roomId]);

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      <button
        onClick={() => navigator.clipboard.writeText(roomId)}
      >
        Copy Room ID
      </button>
      {/* Sudoku oyunu burada olacak */}
    </div>
  );
}