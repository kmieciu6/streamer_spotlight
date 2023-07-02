# Streamer Spotlight

Streamer Spotlight is a web application that allows users to discover and vote for their favorite streamers. It provides a platform for streamers to showcase their content and engage with their audience. The application includes both a server-side component built with Node.js and Express, and a client-side component built with React.

## Features

- **Streamer List**: View a list of streamers with their names, descriptions, platforms, and vote counts.
- **Add Streamer**: Add a new streamer by providing their name, description, and platform.
- **Vote**: Upvote or downvote a streamer to show your support or dislike.
- **Delete Streamer**: Delete a streamer if you no longer want them in the list.
- **Streamer Details**: View detailed information about a specific streamer, including their name, description, platform, and vote counts.

## Technologies Used

### Server-side

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast and minimalist web application framework for Node.js.
- **SQLite**: A lightweight relational database management system.

### Client-side

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications.
- **Axios**: A promise-based HTTP client for making API requests.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/streamer-spotlight.git`
2. Navigate to the project directory: `cd streamer-spotlight`
3. Install the dependencies:

```shell
npm install

npm start
```


## API Endpoints

The server provides the following API endpoints:

- `GET /streamers`: Get the list of all streamers.
- `GET /streamers/:streamerId`: Get details of a specific streamer.
- `POST /streamers`: Add a new streamer.
- `PUT /streamers/:streamerId/vote`: Upvote or downvote a streamer.
- `DELETE /streamers/:streamerId`: Delete a streamer.

Here are the details of each endpoint:

### Get All Streamers

- `GET /streamers`

This endpoint returns a list of all streamers with their names, descriptions, platforms, and vote counts.

### Get Streamer Details

- `GET /streamers/:streamerId`

This endpoint retrieves the details of a specific streamer identified by the `streamerId` parameter. It returns the streamer's name, description, platform, and vote counts.

### Add Streamer

- `POST /streamers`

Use this endpoint to add a new streamer to the list. Provide the streamer's name, description, and platform in the request body. The server will generate a unique `id` for the streamer and initialize the vote counts to 0.

### Vote for a Streamer

- `PUT /streamers/:streamerId/vote`

This endpoint allows you to upvote or downvote a specific streamer identified by the `streamerId` parameter. Specify the `voteType` as either "upvote" or "downvote" in the request body. The server will update the corresponding vote count for the streamer.

### Delete Streamer

- `DELETE /streamers/:streamerId`

To remove a streamer from the list, use this endpoint and provide the `streamerId` parameter. The server will delete the streamer from the database.

Please note that these endpoints require appropriate authentication and authorization mechanisms for security purposes. Implement authentication and authorization as per your application's requirements.
