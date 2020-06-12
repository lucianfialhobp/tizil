const readline = require('readline-sync')
const state = require('./state.js')

function robot() {
  const content = {
    channel: '',
    period: 'all'
  }

  content.channel = askAndReturnChannelName()
  content.period = askAndReturnPeriod()
  content.game = askAndReturnGame()

  state.save(content)

  function askAndReturnChannelName() {
    return readline.question('Type your twitch channel, example: lucianfialho:  ')
  }

  function askAndReturnPeriod() {
    const period = ['day', 'week', 'month', 'all']
    const selectedPeriodIndex = readline.keyInSelect(period, 'Choose one periodo to get clips, default is all:  ')
    const selectedPeriodText = period[selectedPeriodIndex]

    return selectedPeriodText
  }

  function askAndReturnGame() {
    const game = ['Counter-Strike: Global Offensive', 'VALORANT', 'League of Legends']
    const selectedGameIndex = readline.keyInSelect(game, 'Choose one game to get clips:  ')
    const selectedGameText = game[selectedGameIndex]

    return selectedGameText
  }

}

module.exports = robot
