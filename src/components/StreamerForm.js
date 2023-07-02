import React, { useState } from 'react';

const StreamerForm = ({ onSubmit }) => {
  const [streamer, setStreamer] = useState({ name: '', description: '', platform: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStreamer((prevStreamer) => ({ ...prevStreamer, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!streamer.name.trim() || !streamer.description.trim() || !streamer.platform) {
      setError('Please fill in all data.');
      return;
    }

    setError('');

    onSubmit(streamer);
    setStreamer({ name: '', description: '', platform: '' });
  };

  return (
    <form onSubmit={handleSubmit} className='streamer_form'>
        <div className='form'>
        <label>
          <h4>Name</h4>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={streamer.name}
            onChange={handleChange}
          />
        </label>
        <label>
          <h4>Platform</h4>
          <select name="platform" value={streamer.platform} onChange={handleChange}>
            <option value="">Select platform</option>
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Kick">Kick</option>
            <option value="Rumble">Rumble</option>
          </select>
        </label>
        <label>
          <h4>Description</h4>
          <textarea
            rows="3"
            type="text"
            name="description"
            // placeholder="Description"
            value={streamer.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
      {error && <p className='error'>{error}</p>}
    </form>
  );
};

export default StreamerForm;
