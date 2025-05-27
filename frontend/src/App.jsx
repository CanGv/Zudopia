import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', 'defaultRoom');

    socket.on('receiveMessage', (msg) => {
      setChat((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('chatMessage', { roomId: 'defaultRoom', message });
    setMessage('');
  };

  return (
    <div>
      <h1>Zudopia Chat</h1>
      <div>
        {chat.map((msg, index) => <p key={index}>{msg}</p>)}
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;