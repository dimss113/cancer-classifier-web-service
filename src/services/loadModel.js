const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
  console.log(process.env.MODEL_URL)
    return tf.loadGraphModel(process.env.MODEL_URL);
}
module.exports = loadModel;