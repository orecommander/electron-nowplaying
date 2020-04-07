const nowplaying = require('itunes-nowplaying-mac')

const nowplayingRenderer = {
  updateHeaderHeight: () => {
    document.body.style.setProperty('--header-height', document.getElementById('wrapper').offsetTop + 'px')
  },

  render: async () => {
    const resouce = await nowplaying()
    if (!resouce) return

    const title = document.getElementById('title').innerText
    if (title == resouce.name) return

    document.getElementById('title').innerText = resouce.name
    document.getElementById('album').innerText = resouce.album.name
    document.getElementById('artist').innerText = resouce.artist
    const data = await nowplaying.getThumbnailBuffer(resouce.databaseID)
    document.getElementById('image').src = URL.createObjectURL(new Blob([data]))
    nowplayingRenderer.updateHeaderHeight()
  }
}

module.exports = nowplayingRenderer;
