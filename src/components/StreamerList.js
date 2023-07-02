import React from 'react';
import { Link } from 'react-router-dom';
import thumbsUp from '../assets/thumbs up.svg'
import thumbsDown from '../assets/thumbs down.svg'
import x from '../assets/x.svg'

const StreamerList = ({ streamers, onVote, onDelete }) => {
  const handleVote = (streamerId, voteType) => {
    onVote(streamerId, voteType);
  };

  const handleDeleteStreamer = (streamerId) => {
    onDelete(streamerId);
  };

  return (
    <div className='streamer_list'>
      <h2>Streamer List</h2>
      {streamers.map((streamer) => (
        <div key={streamer.id}>
          <h3>{streamer.name}</h3>
          <p>Platform: {streamer.platform}</p>
          <p>Rating: {streamer.upvotes - streamer.downvotes}</p>
          <img className='icon thumbs-up' src={thumbsUp} alt='thumbsUp' onClick={() => handleVote(streamer.id, 'upvote')}/> 
          <img className='icon thumbs-down' src={thumbsDown} alt='thumbsdown' onClick={() => handleVote(streamer.id, 'downvote')}/>
          <Link className='link' to={`/streamers/${streamer.id}`}>View Details</Link>
          <img className='icon x' src={x} alt='delete' onClick={() => handleDeleteStreamer(streamer.id)}/>
        </div>
      ))}
    </div>
  );
};

export default StreamerList;
