const {MongoClient, ObjectId} = require('mongodb');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();

const client = new MongoClient(process.env.DB_URI);

async function createDate(userID, date, note) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function(err) {
        const insertResult = await client.db('Calendar').collection('date')
            .insertOne({
              'userID': new ObjectId(userID),
              'date': date,
              'note': note,
            });

        client.close();
        resolve(insertResult);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function readDates(userID) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function(err) {
        const readResult = await client.db('Calendar').collection('date')
            .find({
              'userID': new ObjectId(userID),
            }).toArray();

        client.close();
        resolve(readResult);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function readDate(dateID) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function(err) {
        const readResult = await client.db('Calendar').collection('date')
            .find({
              '_id': new ObjectId(dateID),
            }).toArray();

        client.close();
        resolve(readResult);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function updateDate(userID, dateID, date, note) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function(err) {
        const updateResult = await client.db('Calendar').collection('date')
            .updateOne(
                {
                  '_id': new ObjectId(dateID)},
                {
                  $set: {
                    'userID': userID,
                    'date': date,
                    'note': note,
                  },
                },
            );

        client.close();
        resolve(updateResult);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function deleteDate(dateID) {
  return new Promise((resolve, reject) => {
    try {
      client.connect(async function(err) {
        const deleteResult = await client.db('Calendar').collection('date')
            .deleteOne(
                {
                  '_id': new ObjectId(dateID),
                },
            );

        client.close();
        resolve(deleteResult);
      });
    } catch (error) {
      reject(error);
    }
  });
}

exports.createDate = createDate;
exports.readDates = readDates;
exports.readDate = readDate;
exports.updateDate = updateDate;
exports.deleteDate = deleteDate;
