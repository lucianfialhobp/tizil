const robots = {
    twitch: require('./robots/twitch.js')
}

async function start(){
    let clips = await robots.twitch();
    
}

start()