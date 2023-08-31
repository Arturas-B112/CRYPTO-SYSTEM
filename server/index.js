const express = require('express');
const cors = require('cors');
const ccxt = require('ccxt');
require('dotenv').config();

const server = express();

server.use(express.json());
server.use(cors());

server.listen(process.env.PORT, () =>
  console.log(`Server is running on port: ${process.env.PORT}`)
);
