import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import thumbsUp from '../assets/thumbs up.svg'
import thumbsDown from '../assets/thumbs down.svg'

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
      <div className='streamer'>
        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png" alt="Streamer" />
        <div className='detales'>
          <p>Description: {streamer.description}</p>
          <p>Platform: {streamer.platform}</p>
          <p><img className='icon thumbs-up' src={thumbsUp} alt='thumbsUp'/> {streamer.upvotes}</p>
          <p><img className='icon thumbs-down' src={thumbsDown} alt='thumbsDown'/> {streamer.downvotes}</p>
          <p>Rating: {streamer.upvotes - streamer.downvotes}</p>
        </div>
      </div>
    </div>
  );
};

export default StreamerRecord;
