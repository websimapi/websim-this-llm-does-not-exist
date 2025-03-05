import React, { useState, useEffect } from 'react';
import { GalleryItem } from './GalleryItem.js';

export function Gallery({ room }) {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!room) return;

    // Subscribe to profile updates from the database
    const unsubscribe = room.collection('aiProfiles').subscribe((updatedProfiles) => {
      // Sort by newest first
      const sortedProfiles = [...updatedProfiles].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      setProfiles(sortedProfiles);
      setIsLoading(false);
    });

    // Listen for new profile events to trigger animations
    room.onmessage = (event) => {
      if (event.data.type === 'new-profile') {
        // We'll get the actual data through the subscription above
        console.log('New profile added!');
      }
    };

    return () => {
      unsubscribe();
    };
  }, [room]);

  if (isLoading) {
    return (
      <section className="gallery-section">
        <h2 className="gallery-heading">Loading Gallery...</h2>
        <div className="loading-spinner"></div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <h2 className="gallery-heading">AI Profile Gallery</h2>
      {profiles.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No profiles yet. Be the first to generate one!</p>
      ) : (
        <div className="gallery-grid">
          {profiles.map((profile) => (
            <GalleryItem key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </section>
  );
}

