const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const {storeData, getData} = require('../services/storeData');
const { Firestore } = require('@google-cloud/firestore');
 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
  

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }

  await storeData(id, data);
 
  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  response.code(201);
  return response;
}

async function getHistoryData(request, h) {
  try {
    const data = await getData();
    const response = h.response({
      status: 'success',
      data
    })
    response.code(200);
    return response;

  } catch (e) {
    const response = h.response({
      status: 'fail',
      message: e.message,
    })
    response.code(400);
    return response;
  }
}


module.exports = {
  postPredictHandler,
  getHistoryData
}