# WorkFlow

## Feel like you're in the office

By Darnell Eudoxie

## Software Architecture

### Technologies Used

- React
- NextJs
- Prisma
- WebSockets
- MySQL
- Next Auth
- Socket.Io
- JavaScript
- Html
- Bcrypt

### Key Features

- User Authentication

  - Bcrypt security hashing functionality for passwords
  - Auth routes on front end to restrict unauthorized access to user specific site features
  - Users can edit profile information

- Create Channels
  - Users are able to create different channels for individuals.
  - State of current board saves to local storage so user won't lose progress on a page refresh
- Direct Messaging
  - User can direct message any of the users signed up for WorkFlow
  - Users have access to real time direct messaging.

## Users

- GET /api/users - Return all users
- GET /api/users/:id - Return all channels and messages of the user
- GET /api/users/:id/channels - Return all channels of user at id
- PUT /api/users/:id - Edit user at id.
- DELETE /:id - Delete user at id

## Channels

- GET /api/channels - Return all channels
- GET api/channel/:id - Return a channel with that id
- POST api/channel - Create new channel and messages

## App

- POST /signup - Create new user
- POST /login - Login user
- POST /logout - Logout current user

## To run this app:

Clone app and npm install to get the project dependecies

#

Create the following environment variables:

- DATABASE_URL
- JWT_SECRET

### run "npm run dev" to start the development server
