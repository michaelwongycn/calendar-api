const userHandler = require('../handlers/user');

async function createUser(req, res) {
  if (req.body.name === undefined ||
      req.body.username === undefined ||
      req.body.password == undefined) {
    res.status(400).send('Invalid Body/Params');
  }
  const result = await userHandler.createUser(
      req.body.name,
      req.body.username,
      req.body.password);
  res.status(result.statusCode).json(result.statusMessage);
}

async function readUsers(req, res) {
  const result = await userHandler.readUsers();
  res.status(result.statusCode).send(result.statusMessage);
}

async function readUser(req, res) {
  if (req.params.userID === undefined) {
    res.status(400).send('Invalid Body/Params');
  }
  const result = await userHandler.readUser(
      req.params.userID);
  res.status(result.statusCode).send(result.statusMessage);
}

async function updateUser(req, res) {
  if (req.params.userID === undefined ||
      req.body.name === undefined ||
      req.body.username == undefined ||
      req.body.password === undefined) {
    res.status(400).send('Invalid RBody/Params');
  }
  const result = await userHandler.updateUser(
      req.params.userID,
      req.body.name,
      req.body.username,
      req.body.password);
  res.status(result.statusCode).send(result.statusMessage);
}

async function deleteUser(req, res) {
  if (req.params.userID === undefined) {
    res.status(400).send('Invalid Body/Params');
  }
  const result = await userHandler.deleteUser(
      req.params.userID);
  res.status(result.statusCode).send(result.statusMessage);
}

exports.createUser = createUser;
exports.readUser = readUser;
exports.readUsers = readUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
