import React from 'react';
import { Link } from 'react-router-dom';
import thumbsUp from '../assets/thumbs up.svg'
import thumbsDown from '../assets/thumbs down.svg'

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
          {/* <p>Description: {streamer.description}</p> */}
          <p>Platform: {streamer.platform}</p>
          {/* <p>Upvotes: {streamer.upvotes}</p> */}
          {/* <p>Downvotes: {streamer.downvotes}</p> */}
          <p>Votes Difference: {streamer.upvotes - streamer.downvotes}</p>
          <img className='icon thumbs-up' src={thumbsUp} alt='thumbsUp' onClick={() => handleVote(streamer.id, 'upvote')}/> 
          <img className='icon thumbs-down' src={thumbsDown} alt='thumbsdown' onClick={() => handleVote(streamer.id, 'downvote')}/>
          <button onClick={() => handleDeleteStreamer(streamer.id)}>Delete</button>
          <button><Link to={`/streamers/${streamer.id}`}>View Details</Link></button>
        </div>
      ))}
    </div>
  );
};

export default StreamerList;
