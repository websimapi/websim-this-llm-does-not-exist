import React from 'react';

export function GalleryItem({ profile }) {
  // Calculate how long ago the profile was created
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const seconds = Math.floor((now - created) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  // Truncate profile text if it's too long
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="gallery-item fade-in">
      <img 
        src={profile.imageUrl} 
        alt="AI Generated Profile" 
        className="gallery-image"
        loading="lazy" 
      />
      <div className="gallery-content">
        <h3>{profile.prompt}</h3>
        <p>{truncateText(profile.profileText)}</p>
        <p className="username">
          Created by {profile.username} • {getTimeAgo(profile.created_at)}
        </p>
      </div>
    </div>
  );
}

