const express = require("express");
const app = express();
require('dotenv').config(); // For .env credentials
const readline = require('readline');
const http = require('http');

const {  
  messages
} = require("./config/constants");

// Client Server is starts from here

var rl = readline.createInterface(
  process.stdin, process.stdout);


  //  First Question
function question1() {
  return new Promise((resolve, reject) => {
    rl.question('How many clients we want to create from this 1 Node client ?', (noOfClients) => {
      noOfClients = parseInt(noOfClients);
      if (!noOfClients || typeof noOfClients != 'number') {
        resolve(false)
      }
      resolve(noOfClients);
    })
  })
}

//  Second Question
function question2(noOfClients) {
  return new Promise((resolve, reject) => {
    rl.question('Seconds X (How many X seconds we have to send data) ?', (secondX) => {
      secondX = parseInt(secondX);
      if (!secondX || typeof secondX != 'number') {
        resolve([noOfClients, false])
      }
      resolve([noOfClients, secondX]);
    })
  })
}

// Defined variable interval for specific time call
let interval;
// Operation start
function outputEverything([noOfClients, secondX]) {

  // test number of client
  noOfClients = parseInt(noOfClients);
  if (!noOfClients || typeof noOfClients != 'number') {
    console.log(messages.noValidClients);
    rl.close();
  }

  // test number of seconds
  secondX = parseInt(secondX);
  if (!secondX || typeof secondX != 'number') {
    console.log(messages.noValidSeconds);
    rl.close();
  }

  // Create ports based on number of clients
  const portsList = generateRandomPort(noOfClients);

  // From seconds to miliseconds for api call intervals
  const sToMs = secondX * 1000;

  // increase count based on number of clients ports
  let increaseApiCount = 0;
  interval = setInterval(function() {
    // Start listen port and call api to backend
    createPortAndClient(increaseApiCount, portsList, sToMs, rl);
    increaseApiCount++;
  }, sToMs);

}

// createPortAndClient used for port listen and call backend api
function createPortAndClient(index, portsList, sToMs, rl) {
  // index = Index of current interval, 
  // portsList = List of ports based on number of clients given, 
  // sToMs = Milisonds loan polling, 
  // rl = readline parameter
  if(index < portsList.length) {
    // Each port
    let currentPort = portsList[index];
    
    // Listen current port
    const server = app.listen(currentPort, () => {

      console.log("Request call from CLIENT PORT: "+currentPort + " " + getTime());
      // GET API to call backend api, send long polling and port along with api
      http.get('http://'+process.env.HOST+':'+process.env.PORT+'/api?port='+currentPort+"&loanpolling="+sToMs, (res) => {
        
        // GET response back from server
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('Response from server : ' + chunk + " " + getTime());
        });
      
        // Close the server and kill the process
        process.on('SIGTERM', () => {
          server.close(() => {})
        });

        // Close the server and kill the process
        process.kill(process.pid, 'SIGTERM');

      }).on("error", (err) => {
        
        // Showing the exect error
        console.log("Error: " + err.message);
      
        // Close the server and kill the process
        process.on('SIGTERM', () => {
          server.close(() => {})
        });

        // Close the server and kill the process
        process.kill(process.pid, 'SIGTERM');

        // Clear interval as error occured
        clearInterval(interval);

        // Return the response
        console.log(messages.serverProblem);
        
        // Stop further question as error accured
        rl.close();
        
      });
    
    })
  } else {
    // Clear interval as all client operation completed
    clearInterval(interval);

    // Return the response
    console.log(`Operation done for ${portsList.length} clients`);
    
    // Stop further question as final ansewer given
    rl.close();
  }

}

// Question Loop
question1().then(question2).then(outputEverything);

// Generate Rendom port based on number of clients
function generateRandomPort(ports) {
  return Array.from({ length: ports }, () => Math.floor(Math.random() * 2999));
}

// Get Time to show interval seconds
function getTime() {
  const d = new Date();
  const n = d.toLocaleTimeString();
  return n;
}