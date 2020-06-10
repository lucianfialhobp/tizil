const axios = require('axios')
const qs = require('querystring');
const state = require('./state.js')

async function robot(){
    const content = state.load()

    await getMonthClips()

    async function getMonthClips(){
        // TODO: Verify Channel is required
        const data = {
            channel: content.channel,
            period: content.period
        }

         axios({
            method: 'get',
            url: `https://api.twitch.tv/kraken/clips/top?${qs.stringify(data)}`,
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'dlpr96izow24qfp1qf5mlbu7ees7we',
               
            },
          }).then(function (response) {
            content.clips = createVideoProperty(response.data.clips)
            state.save(content)
          });
    }

    function createVideoProperty (clips) {

        return clips.map(clip => ({ ...clip, videoMp4url: clip.thumbnails.medium.replace(/-preview-480x272.jpg/, '.mp4') }))

    }
}

module.exports = robot