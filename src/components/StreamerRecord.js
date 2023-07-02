import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StreamerRecord = () => {
  const { id } = useParams();
  const [streamer, setStreamer] = useState(null);

  useEffect(() => {
    const fetchStreamer = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/streamers/${id}`);
        setStreamer(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStreamer();
  }, [id]);

  if (!streamer) {
    return <div>Loading...</div>;
  }

  return (
    <div className='streamer_record'>
      <h2>Streamer Details</h2>
      <h3>{streamer.name}</h3>
      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png" alt="Streamer" />
      <p>Description: {streamer.description}</p>
      <p>Platform: {streamer.platform}</p>
      <p>Upvotes: {streamer.upvotes}</p>
      <p>Downvotes: {streamer.downvotes}</p>
      <p>Votes Difference: {streamer.upvotes - streamer.downvotes}</p>
    </div>
  );
};

export default StreamerRecord;
