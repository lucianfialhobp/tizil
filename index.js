const robots = {
    input: require('./robots/input.js'),
    twitch: require('./robots/twitch.js'),
    state: require('./robots/state.js'),
    downloader: require('./robots/downloader.js'),
    editor: require('./robots/editor.js'),
    youtube: require('./robots/youtube.js')
}

async function start(){
    
    robots.input()
    await robots.twitch()
    await robots.downloader()
    await robots.editor()
    await robots.youtube()
}

start()