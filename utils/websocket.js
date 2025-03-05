export async function setupWebSocket() {
  try {
    const room = new WebsimSocket();
    console.log('WebSocket connected');
    
    // Initialize room event handling
    room.onmessage = (event) => {
      const data = event.data;
      
      switch (data.type) {
        case "connected":
          console.log(`User connected: ${data.username} (${data.clientId})`);
          break;
        case "disconnected":
          console.log(`User disconnected: ${data.username} (${data.clientId})`);
          break;
        // Custom events will be handled in their respective components
        default:
          break;
      }
    };
    
    return room;
  } catch (error) {
    console.error('WebSocket connection error:', error);
    throw error;
  }
}

