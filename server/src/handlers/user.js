const userRepository = require('../repositories/user');

async function createUser(name, username, password) {
  const result = await userRepository.createUser(name, username, password);
  if (result.insertedId != undefined) {
    return {
      statusCode: 200,
      statusMessage: {
        result: {
          userID: result.insertedId,
        },
      },
    };
  } else {
    return {
      statusCode: 500,
      statusMessage: 'Cannot Create User Data',
    };
  }
}

async function readUsers() {
  const result = await userRepository.readUsers();
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

async function readUser(userID) {
  const result = await userRepository.readUser(userID);
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

async function updateUser(userID, name, username, password) {
  const result = await userRepository.readUser(userID)
      .then(() => userRepository.updateUser(userID, name, username, password),
      ).catch((error) =>
        console.log(error),
      );
  if (result.modifiedCount === 1) {
    return {
      statusCode: 200,
      statusMessage: 'Success Updating User Data',
    };
  } else if (result.matchedCount === 0) {
    return {
      statusCode: 404,
      statusMessage: 'User Not Found',
    };
  } else if (result.matchedCount === 1 && result.modifiedCount === 0) {
    return {
      statusCode: 500,
      statusMessage: 'Cannot Update User Data',
    };
  }
}

async function deleteUser(userID) {
  const result = await userRepository.readUser(userID)
      .then(() => userRepository.deleteUser(userID),
      ).catch((error) =>
        console.log(error),
      );
  if (result.deletedCount === 1) {
    return {
      statusCode: 200,
      statusMessage: 'Success Deleting User Data',
    };
  } else if (result.deletedCount === 0) {
    return {
      statusCode: 404,
      statusMessage: 'User Not Found',
    };
  }
}

exports.createUser = createUser;
exports.readUser = readUser;
exports.readUsers = readUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
