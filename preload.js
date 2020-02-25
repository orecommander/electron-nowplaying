const electron = require('electron');
const nowplayingTweet = require('./nowplaying_tweet');
const nowplayingRenderer = require('./nowplaying_renderer');

process.once('loaded', () => {
  global.process = process;
  global.electron = electron;
  global.module = module;
  global.nowplayingTweet = nowplayingTweet
  global.nowplayingRenderer = nowplayingRenderer
})
