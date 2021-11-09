const userRepository = require('../repositories/user');
const dateRepository = require('../repositories/date');

async function createDate(userID, date, note) {
  const insertResult = await userRepository.readUser(userID)
      .then(() => dateRepository.createDate(userID, date, note))
      .catch((error) =>
        console.log(error),
      );
  const updateResult = await userRepository.createUserDate(userID, insertResult.insertedId)
      .catch((error) =>
        console.log(error),
      );
  if (updateResult.modifiedCount === 1) {
    return {
      statusCode: 200,
      statusMessage: {
        result: {
          dateID: insertResult.insertedId,
        },
      },
    };
  } else if (updateResult.matchedCount === 0) {
    return {
      statusCode: 404,
      statusMessage: 'User Not Found',
    };
  } else if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 0) {
    return {
      statusCode: 500,
      statusMessage: 'Cannot Creating User Date Data',
    };
  }
}

async function readDates(userID) {
  const result = await dateRepository.readDates(userID);
  console.log(result);
  if (result.length !== 0) {
    return {
      statusCode: 200,
      statusMessage: {
        result: result,
      },
    };
  } else {
    return {
      statusCode: 404,
      statusMessage: 'User Not Found',
    };
  }
}

async function readDate(dateID) {
  const result = await dateRepository.readDate(dateID);
  if (result.length !== 0) {
    return {
      statusCode: 200,
      statusMessage: {
        result: result,
      },
    };
  } else {
    return {
      statusCode: 404,
      statusMessage: 'User Not Found',
    };
  }
}

async function updateDate(userID, dateID, date, note) {
  const result = await userRepository.readUser(userID)
      .then(() => dateRepository.readDate(dateID))
      .then(() => dateRepository.updateDate(userID, dateID, date, note))
      .catch((error) =>
        console.log(error),
      );
  if (result.modifiedCount === 1) {
    return {
      statusCode: 200,
      statusMessage: 'Success Updating User Date Data',
    };
  } else if (result.matchedCount === 0) {
    return {
      statusCode: 404,
      statusMessage: 'User Not Found',
    };
  } else if (result.matchedCount === 1 && result.modifiedCount === 0) {
    return {
      statusCode: 500,
      statusMessage: 'Cannot Updating User Date Data',
    };
  }
}

async function deleteDate(userID, dateID) {
  const result = await userRepository.readUser(userID)
      .then(() => dateRepository.readDate(dateID),
      )
      .then(() => dateRepository.deleteDate(dateID),
      )
      .then(() => userRepository.deleteUserDate(userID, dateID),
      )
      .catch((error) =>
        console.log(error),
      );
  if (result.modifiedCount === 1) {
    return {
      statusCode: 200,
      statusMessage: 'Success Deleting User Date Data',
    };
  } else if (result.matchedCount === 0) {
    return {
      statusCode: 404,
      statusMessage: 'User Not Found',
    };
  } else if (result.matchedCount === 1 && result.modifiedCount === 0) {
    return {
      statusCode: 500,
      statusMessage: 'Cannot Deleting User Date Data',
    };
  }
}

exports.createDate = createDate;
exports.readDates = readDates;
exports.readDate = readDate;
exports.updateDate = updateDate;
exports.deleteDate = deleteDate;
