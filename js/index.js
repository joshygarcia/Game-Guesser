const getApiKey =  async () => {
  const response = await fetch('https://id.twitch.tv/oauth2/token?client_id=xa1693c4tecsc6kp8m5hh5yemzube8&client_secret=zilm2kgj0lrbdrye67s74033j175qt&grant_type=client_credentials', {method: 'POST'})
  const data = await response.json()

  apikey = data.access_token
  localStorage.setItem('apikey', apikey)
  console.log(apikey)
  return data.access_token
}

getApiKey()

const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('apikey')}`,
      'Client-ID': 'xa1693c4tecsc6kp8m5hh5yemzube8',
      'Content-Type': 'application/json'
    },
    body: 'fields name,cover.image_id,url,similar_games.name; where total_rating_count > 100; limit 500;'
}
  
const fetchGame = async () => {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games?', options)
  const data = await response.json()

  return data
}

const getGame = async () => {
  const result = await fetchGame()
  const gameId = Math.floor(Math.random() * 500)

  const gameOptions = await getGameOptions(result[gameId].name, result[gameId].similar_games)
  const gameOptionsHtml = await getGameOptionsHtml(gameOptions)
 
  document.getElementById('game-name').innerText = `${result[gameId].name}`
  document.getElementById('game-cover').innerHTML = `<img src="https://images.igdb.com/igdb/image/upload/t_cover_big/${result[gameId].cover.image_id}.jpg">`
  document.getElementById('game-options').innerHTML = gameOptionsHtml
}

const getGameOptions = async (name, similar_games) => {
  let result = []
  result.push(name)
  for (let i = 0; i <= 2; i++) {
    result.push(similar_games[Math.floor(Math.random() * similar_games.length)].name)
  }
  shuffleArray(result)
  return result
}

const getGameOptionsHtml = (gameOptionsArr) => {
  let optionsHtml = ''
  // console.log(gameOptionsArr)
  for(game of gameOptionsArr) {
    optionsHtml += `<p class="game-option">${game}</p>`
  }
  return optionsHtml
}

function shuffleArray(array) {
  let currentIndex = array.length
  let randomIndex

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array;
}

getGame()