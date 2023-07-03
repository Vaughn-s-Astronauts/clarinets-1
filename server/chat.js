const {CHAT} = require('../config.js');
const { Configuration, OpenAIApi } = require('openai');
let config = new Configuration({
    apiKey: CHAT,
  });
  
let openai = new OpenAIApi(config);

module.exports = {
    chatter: openai
}