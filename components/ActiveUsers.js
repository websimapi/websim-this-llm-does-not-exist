import React, { useState, useEffect } from 'react';

export function ActiveUsers({ room }) {
  const [peerCount, setPeerCount] = useState(0);

  useEffect(() => {
    if (!room) return;

    const updatePeerCount = (peers) => {
      setPeerCount(Object.keys(peers).length);
    };

    // Initialize with current count
    updatePeerCount(room.party.peers);

    // Subscribe to peer updates
    const unsubscribe = room.party.subscribe(updatePeerCount);

    return () => {
      unsubscribe();
    };
  }, [room]);

  return (
    <div className="active-users">
      <span>{peerCount}</span> {peerCount === 1 ? 'person' : 'people'} online
    </div>
  );
}

