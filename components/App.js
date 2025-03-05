import React, { useState, useEffect } from 'react';
import { Header } from './Header.js';
import { Generator } from './Generator.js';
import { Gallery } from './Gallery.js';
import { ActiveUsers } from './ActiveUsers.js';
import { setupWebSocket } from '../utils/websocket.js';

export function App() {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initWebSocket() {
      const websocketRoom = await setupWebSocket();
      setRoom(websocketRoom);
      setIsLoading(false);
    }
    
    initWebSocket();
  }, []);

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="app-container">
      <Header />
      <Generator room={room} />
      <Gallery room={room} />
      <ActiveUsers room={room} />
    </div>
  );
}

