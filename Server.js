const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./src/models/database.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS Streamer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT,
  platform TEXT,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0
)`);

app.post('/streamers', (req, res) => {
  const { name, description, platform } = req.body;

  if (!name || !description || !platform) {
    return res.status(400).json({ error: 'Please fill in all the fields.' });
  }

  const newStreamer = {
    name,
    description,
    platform,
    upvotes: 0,
    downvotes: 0,
  };

  db.get('SELECT MAX(id) AS maxId FROM Streamer', (err, row) => {
    if (err) {
      console.error('Error fetching max ID:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    const nextId = row && row.maxId ? row.maxId + 1 : 1;

    db.run(
      `INSERT INTO Streamer (id, name, description, platform, upvotes, downvotes) VALUES (?, ?, ?, ?, ?, ?)`,
      [nextId, name, description, platform, 0, 0],
      function (err) {
        if (err) {
          console.error('Error adding a streamer:', err);
          return res.status(500).json({ error: 'Server error' });
        }

        res.status(201).json({ ...newStreamer, id: nextId });
      }
    );
  });
});

app.get('/streamers', (req, res) => {
  db.all('SELECT * FROM Streamer', (err, rows) => {
    if (err) {
      console.error('Error fetching streamers:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(200).json(rows);
  });
});

app.get('/streamers/:streamerId', (req, res) => {
  const { streamerId } = req.params;
  db.get('SELECT * FROM Streamer WHERE id = ?', streamerId, (err, row) => {
    if (err) {
      console.error('Error fetching streamer:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Streamer not found' });
    }
    res.status(200).json(row);
  });
});

app.put('/streamers/:streamerId/vote', (req, res) => {
  const { streamerId } = req.params;
  const { voteType } = req.body;

  if (voteType !== 'upvote' && voteType !== 'downvote') {
    return res.status(400).json({ error: 'Invalid vote type' });
  }

  db.get('SELECT * FROM Streamer WHERE id = ?', streamerId, (err, row) => {
    if (err) {
      console.error('Error fetching streamer:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Streamer not found' });
    }

    const voteColumn = voteType === 'upvote' ? 'upvotes' : 'downvotes';

    db.run(
      `UPDATE Streamer SET ${voteColumn} = ${voteColumn} + 1 WHERE id = ?`,
      streamerId,
      function (err) {
        if (err) {
          console.error('Error updating streamer:', err);
          return res.status(500).json({ error: 'Server error' });
        }

        res.status(200).json({ message: 'Vote successful' });
      }
    );
  });
});

app.delete('/streamers/:streamerId', (req, res) => {
  const { streamerId } = req.params;
  db.get('SELECT * FROM Streamer WHERE id = ?', streamerId, (err, row) => {
    if (err) {
      console.error('Error fetching streamer:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Streamer not found' });
    }

    db.run('DELETE FROM Streamer WHERE id = ?', streamerId, function (err) {
      if (err) {
        console.error('Error deleting streamer:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.status(200).json({ message: 'Streamer deleted' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
