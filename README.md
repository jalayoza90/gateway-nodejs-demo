# gateway-nodejs-demo
Gateway group interview for Nodejs. Nodejs Demo application.
This project contains 2 Questions for client and interval time between call api from client to server.

# Features

1. Server side api call.
2. Ask question for number of clients  in node terminal
3. Ask time interval in node terminal
4. Create dynamic port for number of customer
5. One dedicate port for backend
6. Call api from client at certain time given in question 2
7. Response from backend displaied in node terminal

# Installation

- #### Yarn installation on Ubuntu

  You can install Yarn easily with npm install, just run the following commands.

      $ npm install --global yarn
      
- ### How to use

      $ git clone https://github.com/jalayoza90/gateway-nodejs-demo.git
      $ cd gateway-nodejs-demo
      $ yarn
      $ Rename sample.env to .env

- ### Start backend server
      $ yarn start server
      $ i.e. http://localhost:3000 (Note: Please use port 3000, example in sample.env)

- ### Start frontend server
      $ yarn start client
 
 #### (Note: Please run both in separate terminal)