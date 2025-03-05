import React, { useState } from 'react';
import { generateAIProfile, generateAIImage } from '../utils/aiService.js';

export function Generator({ room }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a prompt' });
      return;
    }
    
    setIsGenerating(true);
    setStatusMessage({ type: 'success', text: 'Generating profile...' });
    
    try {
      // Step 1: Generate the profile text
      const profileText = await generateAIProfile(prompt);
      setStatusMessage({ type: 'success', text: 'Generating image...' });
      
      // Step 2: Use the generated text to create an image
      const imageUrl = await generateAIImage(profileText);
      
      // Step 3: Save to the database
      await room.collection('aiProfiles').create({
        prompt,
        profileText,
        imageUrl,
        timestamp: new Date().toISOString(),
      });
      
      setPrompt('');
      setStatusMessage({ type: 'success', text: 'Profile successfully generated and added to the gallery!' });
      
      // Broadcast event to notify others
      room.send({
        type: 'new-profile',
        echo: true,
      });
      
    } catch (error) {
      console.error('Generation error:', error);
      setStatusMessage({ type: 'error', text: 'Error generating profile. Please try again.' });
    } finally {
      setIsGenerating(false);
      
      // Clear success message after 5 seconds
      if (statusMessage?.type === 'success') {
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
      }
    }
  };

  return (
    <section className="generator-section">
      <h2>Generate a New AI Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="prompt">Enter a prompt (e.g., "A tech CEO from the future", "A medieval knight in modern times")</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the profile you want to generate..."
            disabled={isGenerating}
          />
        </div>
        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Profile'}
        </button>
      </form>
      
      {statusMessage && (
        <div className={`status-message ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}
      
      {isGenerating && <div className="loading-spinner"></div>}
    </section>
  );
}

