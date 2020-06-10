const state = require('./state.js')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

async function robot() {
    const content = await state.load()
    const dir = './temp';
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    await downloadVideos(content)

    async function downloadVideos(content) {
        
        const promises = content.clips.map(async (clip) => {
            let video = await axios.get(clip.videoMp4url, {
                responseType: 'stream'
            })
            
            video.data.pipe(fs.createWriteStream(`./temp/${clip.slug}.mp4`))
        });
    
        await Promise.all(promises);
    }

}

module.exports = robot
