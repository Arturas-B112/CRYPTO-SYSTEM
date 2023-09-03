const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const server = express();

server.use(express.json());
server.use(cors());

const mongoClient = new MongoClient(process.env.CONNECTION_STRING);
const PORT = process.env.PORT || 8080;

server.post('/selected', async (req, res) => {
  const payload = req.body;
  try {
    const mongoCluster = await mongoClient.connect();
    const selectedCoin = {
      name: payload.name,
    };

    const response = await mongoCluster
      .db('CryptoSystem')
      .collection('Actions')
      .insertOne(selectedCoin);

    await mongoCluster.close();
    console.log(`User selected the ${payload.name}`);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.post('/searched', async (req, res) => {
  const payload = req.body;
  try {
    const mongoCluster = await mongoClient.connect();
    const searhedCoin = {
      name: payload.name,
    };

    const response = await mongoCluster
      .db('CryptoSystem')
      .collection('Searches')
      .insertOne(searhedCoin);

    await mongoCluster.close();
    console.log(`User searched for ${payload.name}`);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
