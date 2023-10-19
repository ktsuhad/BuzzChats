
# BuzzChat - Real-Time Chat Application

BuzzChat is a real-time chat application built using the MERN (MongoDB, Express, React, Node) stack. It enables users to engage in real-time conversations, both one-on-one and in groups, while also offering user authentication, user profiles, and more.

![BuzzChat Screenshot](/buzzChat.png)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time one-on-one chat
- Group chat functionality
- User authentication with JWT
- User profile management
- WebSocket-based real-time communication with Socket.IO
- User avatars
- Emoji support


## Installation

To run BuzzChat locally, you'll need to set up both the frontend and backend:

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/ktsuhad/BuzzChats.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd BuzzChats/frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`.

### Backend

1. Navigate to the backend directory:

   ```bash
   cd BuzzChats/backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`.

**Note:** Make sure you have MongoDB installed and configured with the appropriate connection details. Update the configuration in the backend if necessary.

## Usage

1. Register for a new account or log in with your existing credentials.
2. Create or join chat rooms.
3. Start chatting in real-time with other users.
4. Customize your user profile with avatars and personal information.
5. Enjoy group discussions and private conversations.

## Technologies Used

- MongoDB: Database
- Express.js: Backend framework
- React: Frontend library
- Node.js: Server runtime
- Socket.IO: Real-time communication
- JWT: User authentication
- Material-UI: User interface design
- GitHub: Version control and project hosting

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or bug fixes. Please follow the [Contributing Guidelines](CONTRIBUTING.md) for this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[![GitHub](https://img.shields.io/github/license/ktsuhad/BuzzChats)](LICENSE)

Feel free to customize the README by adding more specific information about your project and include relevant images or badges as needed. Make sure to replace the placeholder URLs and email with the actual ones.