const robots = {
    input: require('./robots/input.js'),
    twitch: require('./robots/twitch.js'),
    state: require('./robots/state.js'),

}

async function start(){
    robots.input()
    let clips = await robots.twitch()
    
}

start()