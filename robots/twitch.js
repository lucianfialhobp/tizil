const axios = require('axios')
const qs = require('querystring');


async function robot(){
    await getMonthClips()

    async function getMonthClips(){
        let data ={
            channel: 'lucianfialho',
            period: 'all'
        }
        axios({
            method: 'get',
            url: `https://api.twitch.tv/kraken/clips/top?${qs.stringify(data)}`,
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'dlpr96izow24qfp1qf5mlbu7ees7we',
               
            },
          }).then(function (response) {
            console.log(response.data)
          });
        // Client ID:dlpr96izow24qfp1qf5mlbu7ees7we

        // let lastMonthClips = await axios.get('', config).then(function(res){
        //     console.log(res)
        // }).catch(function (error) {
        //     // handle error
        //     console.log(error);
        // })

        // console.log(lastMonthClips)
    }
}

module.exports = robot