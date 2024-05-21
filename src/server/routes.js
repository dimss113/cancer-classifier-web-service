const { postPredictHandler } = require('../server/handler');
const { getHistoryData } = require('../server/handler');

 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 1000000,
        multipart: true,
        allow: 'multipart/form-data',
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getHistoryData,
  }
]
 
module.exports = routes;