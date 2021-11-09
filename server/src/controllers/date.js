const dateHandler = require('../handlers/date');

async function createDate(req, res) {
  if (req.params.userID === undefined ||
      req.body.date === undefined ||
      req.body.note === undefined) {
    res.status(400).send('Invalid Body/Params');
  }
  const result = await dateHandler.createDate(
      req.params.userID,
      req.body.date,
      req.body.note);
  res.status(result.statusCode).send(result.statusMessage);
}

async function readDates(req, res) {
  if (req.params.userID === undefined) {
    res.status(400).send('Invalid Body/Params');
  }
  const result = await dateHandler.readDates(
      req.params.userID,
  );
  res.status(result.statusCode).send(result.statusMessage);
}

async function readDate(req, res) {
  if (req.params.dateID === undefined) {
    res.status(400).send('Invalid Body/Params');
  }
  const result = await dateHandler.readDate(
      req.params.dateID,
  );
  res.status(result.statusCode).send(result.statusMessage);
}

async function updateDate(req, res) {
  if (req.params.userID === undefined |
      req.params.dateID === undefined ||
      req.body.date === undefined ||
      req.body.note === undefined) {
    res.status(400).send('Invalid Body/Params');
  }
  const result = await dateHandler.updateDate(
      req.params.userID,
      req.params.dateID,
      req.body.date,
      req.body.note);
  res.status(result.statusCode).send(result.statusMessage);
}

async function deleteDate(req, res) {
  if (req.params.userID === undefined ||
      req.params.dateID === undefined) {
    res.status(400).send('Invalid Body/Params');
  }
  const result = await dateHandler.deleteDate(
      req.params.userID,
      req.params.dateID);
  res.status(result.statusCode).send(result.statusMessage);
}

exports.createDate = createDate;
exports.readDates = readDates;
exports.readDate = readDate;
exports.updateDate = updateDate;
exports.deleteDate = deleteDate;

