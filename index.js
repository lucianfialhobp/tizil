const robots = {
    twitch: require('./robots/twitch.js')
}

async function start(){
    let clips = robots.twitch();

    console.log(clips)
}

start()