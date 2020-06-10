const axios = require('axios')
const qs = require('querystring');
const state = require('./state.js')

async function robot(){
    const content = state.load()
    
    await getMonthClips(content)

    state.save(content)
    
    async function getMonthClips(content){
        // TODO: Verify Channel is required
        const data = {
            channel: content.channel,
            period: content.period
        }

        let response = await axios.get(`https://api.twitch.tv/kraken/clips/top?${qs.stringify(data)}`, {
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'dlpr96izow24qfp1qf5mlbu7ees7we',
            },
        })

        content.clips = await createVideoProperty(response.data.clips)
    }

    function createVideoProperty (clips) {
        return clips.map(clip => ({ ...clip, videoMp4url: clip.thumbnails.medium.replace(/-preview-480x272.jpg/, '.mp4') }))
    }
}

module.exports = robot