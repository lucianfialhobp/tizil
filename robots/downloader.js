const state = require('./state.js')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

async function robot() {
    const content = await state.load()
    const dir = './temp';
    
    console.log('> [downloader-robot] Checking temp folder')
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }else {
        console.log('> [downloader-robot] Cleaning temp folder')

        fs.readdir(dir, (err, files) => {
            if (err) throw err;
            for (const file of files) {
              fs.unlink(path.join(dir, file), err => {
                if (err) throw err;
              });
            }
        });
        console.log('> [downloader-robot] Success temp folder is clean')
    }

    await downloadVideos(content)

    async function downloadVideos(content) {
        console.log('> [downloader-robot] Starting download clips...')
        const promises = content.clips.map(async (clip) => {
            let video = await axios.get(clip.videoMp4url, {
                responseType: 'stream'
            })
            console.log(`> [downloader-robot] Criando ${clip.slug}.mp4`)
            video.data.pipe(fs.createWriteStream(`./temp/${clip.slug}.mp4`))
        });
    
        await Promise.all(promises);
    }

}

module.exports = robot
