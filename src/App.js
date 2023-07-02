import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StreamerForm from './components/StreamerForm';
import StreamerList from './components/StreamerList';
import StreamerRecord from './components/StreamerRecord';
import axios from 'axios';
import './scss/main.scss';

const App = () => {
  const [streamers, setStreamers] = useState([]);
  const [selectedStreamer, setSelectedStreamer] = useState(null);

  useEffect(() => {
    fetchStreamers();
  }, []);

  const fetchStreamers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/streamers');
      const sortedStreamers = response.data.sort((a, b) => b.id - a.id);
      setStreamers(sortedStreamers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStreamerSubmit = async (streamer) => {
    try {
      const response = await axios.post('http://localhost:3001/streamers', streamer);
      setStreamers((prevStreamers) => [response.data, ...prevStreamers]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStreamerClick = (streamerId) => {
    const selected = streamers.find((streamer) => streamer.id === streamerId);
    setSelectedStreamer(selected);
  };

  const handleVote = async (streamerId, voteType) => {
    try {
      await axios.put(`http://localhost:3001/streamers/${streamerId}/vote`, { voteType });
      fetchStreamers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStreamer = async (streamerId) => {
    try {
      await axios.delete(`http://localhost:3001/streamers/${streamerId}`);
      setStreamers((prevStreamers) => prevStreamers.filter((streamer) => streamer.id !== streamerId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <div className='app'>
        <h1>Streamer App</h1>
        <nav>
          <ul>
            <li>
            <Link className='nav' to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <StreamerForm onSubmit={handleStreamerSubmit} fetchStreamers={fetchStreamers} />
                <StreamerList
                  streamers={streamers}
                  onVote={handleVote}
                  onStreamerClick={handleStreamerClick}
                  onDelete={handleDeleteStreamer}
                />
              </div>
            }
          />
          <Route
            exact path="/streamers/:id"
            element={<StreamerRecord streamer={selectedStreamer} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;