const state = require('./state.js')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

async function robot() {
    const content = await state.load()
    const dir = './temp';
    
    console.log('> [downloader-robot] Checking temp folder')
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir)
    }else {
        console.log('> [downloader-robot] Cleaning temp folder')

        fs.readdir(dir, (err, files) => {
            if (err) throw err;
            for (const file of files) {
              fs.unlink(path.join(dir, file), err => {
                if (err) throw err;
              })
            }
        })

        console.log('> [downloader-robot] Success temp folder is clean')
    }

    await downloadVideosAndCreateFiles(content)

    async function downloadVideosAndCreateFiles(content) {
        console.log('> [downloader-robot] Starting download clips...')
        
        return Promise.all(content.clips.map(async (clip) => {
            return Promise.all([
                new Promise(async (resolve, reject) => {
                    let stream = await axios.get(clip.videoMp4url, {responseType: 'stream' })
                        stream.data
                            .pipe(fs.createWriteStream(`./temp/${clip.slug}.mp4`))                    
                            .on('finish', () => {
                                console.log(`${clip.slug} was created`)
                                resolve("Promised resolved");
                            })
                            .on('error', (error) => {
                                console.log(error)
                                reject('Error in creating map', error);
                            })
                })
            ])
        }))


                
    } 

    function createVideoFile(stream) {
        return new Promise((resolve, reject) =>{
            stream.on('end', resolve(`> [downloader-robot] ${stream} was downloaded successful`))
            stream.on('error', reject)
        })
    }
}

module.exports = robot
