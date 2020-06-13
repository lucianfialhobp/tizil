const axios = require('axios')
const qs = require('querystring');
const state = require('./state.js')

async function robot(){
    const content = state.load()
    console.log('> [twitch-robot] Starting...')

    await getMonthClips(content)

    state.save(content)
    
    async function getMonthClips(content){
        console.log('> [twitch-robot] Injecting information...')

        // TODO: Verify Channel is required
        const data = {
            channel: content.channel || '',
            period: content.period,
            limit: content.limit || '20',
            trending: true,
            game: content.game,
            language: "pt-br"
        }

        const filteredData = returnReqDataFilteredByEmpty(data);
        
        console.log('> [twitch-robot] Making request with twitch api ...')
        let response = await axios.get(`https://api.twitch.tv/kraken/clips/top?${qs.stringify(filteredData)}`, {
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'dlpr96izow24qfp1qf5mlbu7ees7we',
            },
        })
        console.log('> [twitch-robot] Retriving api data ...')

        content.clips = await createVideoProperty(response.data.clips)

    }

    function returnReqDataFilteredByEmpty(data){
        const filtered = {}
        
        Object.entries(data).forEach(([key, value]) => {
            if(!!value && value !== '') {
                filtered[`${key}`] = value 
            }
        });

        return filtered
    }

    function createVideoProperty (data) {
        return data.map(clip => ({ ...clip, videoMp4url: clip.thumbnails.medium.replace(/-preview-480x272.jpg/, '.mp4') }))
    }
}

module.exports = robot