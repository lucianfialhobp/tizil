const spawn = require('child_process').spawn
const path = require('path')
const rootPath = path.resolve(__dirname, '..')

const fromRoot = relPath => path.resolve(rootPath, relPath)

async function robot() {
    console.log('> [video-robot] Starting...')

    await createAndEditvideo()

    async function createAndEditvideo(content) {
        return new Promise((resolve, reject) => {

            const afFilePath = 'C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\AfterFX.exe'
            const projetctScript = fromRoot('./template/afterscript.jsx')
            const destinationFilePath = fromRoot('./content/output.mov')
            
            console.log('> [video-robot] Starting After Effects')


            const aerender = spawn(afFilePath, [
                '-r', projetctScript])
        

            aerender.stdout.on('data', (data) => {
                process.stdout.write(data)
            })

            aerender.on('close', () => {
                console.log('> [video-robot] After Effects closed')
                resolve()
            })
        })
    }
}

module.exports = robot