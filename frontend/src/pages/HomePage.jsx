// frontend/src/pages/HomePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL); // örn: http://localhost:5000

export default function HomePage() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    socket.emit("createRoom", {}, (response) => {
      if (response.success) {
        navigate(`/room/${response.roomId}`);
      }
    });
  };

  const handleJoinRoom = () => {
    if (roomCode) navigate(`/room/${roomCode}`);
  };

  return (
    <div className="home-page">
      <h1>Zudopia</h1>
      <button onClick={handleCreateRoom}>Create Game</button>
      <input
        type="text"
        placeholder="Enter Game Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Enter Game</button>
    </div>
  );
}