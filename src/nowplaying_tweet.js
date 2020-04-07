const twitter = require('twitter');
const nowplaying = require('itunes-nowplaying-mac')
const client = new twitter({
  consumer_key        : process.env.CONSUMER_KEY,
  consumer_secret     : process.env.CONSUMER_SECRET,
  access_token_key    : process.env.ACCESS_TOKEN_KEY,
  access_token_secret : process.env.ACCESS_TOKEN_SECRET
})

const nowplayingTweet = {
  beforePostTitle: '',

  showLoading: () => {
    const loading = document.getElementById('loading')
    loading.style.display = 'flex'
  },

  hideLoading: () => {
    const loading = document.getElementById('loading')
    loading.style.display = 'none'
  },

  post: async (rand = false) => {
    const resouce = await nowplaying()
    if (!resouce) return

    if (nowplayingTweet.beforePostTitle == resouce.name) return

    nowplayingTweet.beforePostTitle = resouce.name
    if (rand && Math.floor(Math.random() * 5) != 1) return

    nowplayingTweet.showLoading();
    const artWork = await nowplaying.getThumbnailBuffer(resouce.databaseID)
    client.post('media/upload', {media: artWork}, function(error, media, response) {
      if (error) {
        alert('アートワークで投稿エラーが起こったからログ見て')
        console.log(error)
        nowplayingTweet.hideLoading()
        return
      }
      const comment = document.getElementById('comment').value
      const message = `${comment}\n#Nowplaying ${resouce.name} - ${resouce.artist} (${resouce.album.name})`
      const status = {
        status: message,
        media_ids: media.media_id_string
      }
      client.post('statuses/update', status, function(error, tweet, response) {
        if (error) {
          alert('ツイートで投稿エラーが起こったからログ見て')
          console.log(error)
          nowplayingTweet.hideLoading()
          return
        }
        console.log(tweet);
      });
    })

    nowplayingTweet.hideLoading()
  }
}

module.exports = nowplayingTweet;
