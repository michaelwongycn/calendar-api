const {MongoClient, ObjectId} = require('mongodb');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();

const client = new MongoClient(process.env.DB_URI);

async function createUser(name, username, password) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function() {
        const insertResult = await client.db('Calendar').collection('user').insertOne({
          'name': name,
          'username': username,
          'password': password,
        });
        resolve(insertResult);
        client.close();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function readUsers() {
  return new Promise((resolve, reject) =>{
    try {
      client.connect(async function() {
        const readResult = await client.db('Calendar').collection('user').find({
        }).toArray();
        resolve(readResult);
        client.close();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function readUser(userID) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function() {
        const readResult = await client.db('Calendar').collection('user').find({
          '_id': new ObjectId(userID),
        }).toArray();
        resolve(readResult);
        client.close();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function updateUser(userID, name, username, password) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function() {
        const updateResult = await client.db('Calendar').collection('user').updateOne({
          '_id': new ObjectId(userID),
        }, {
          $set: {
            'name': name,
            'username': username,
            'password': password,
          },
        });
        resolve(updateResult);
        client.close();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function deleteUser(userID) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function() {
        const deleteResult = await client.db('Calendar').collection('user').deleteOne({
          '_id': new ObjectId(userID),
        });
        resolve(deleteResult);
        client.close();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function createUserDate(userID, dateID) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function() {
        const updateResult = await client.db('Calendar').collection('user').updateOne({
          '_id': new ObjectId(userID),
        }, {
          $push: {
            'date': new ObjectId(dateID),
          },
        });
        resolve(updateResult);
        client.close();
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function deleteUserDate(userID, dateID) {
  return new Promise((resolve, reject) =>{
    try {
      client.connect(async function() {
        const updateResult = await client.db('Calendar').collection('user').updateOne({
          '_id': new ObjectId(userID),
        }, {
          $pull: {
            'date': new ObjectId(dateID),
          },
        });
        resolve(updateResult);
        client.close();
      });
    } catch (error) {
      reject(error);
    }
  });
}

exports.createUser = createUser;
exports.readUser = readUser;
exports.readUsers = readUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.createUserDate = createUserDate;
exports.deleteUserDate = deleteUserDate;
