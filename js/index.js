
const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 7p4zwti6xino46dpqbdcp8dahxsj63',
      'Client-ID': 'xa1693c4tecsc6kp8m5hh5yemzube8',
      'Content-Type': 'application/json'
    },
    body: 'fields name,cover.image_id,url; where total_rating_count > 100; limit 500;'
    
}
  
const fetchGame = async () => {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games?', options)
  const data = await response.json()

  return data
}

const getGame = async () => {
  const result = await fetchGame()
  const gameId = Math.floor(Math.random() * 500)
  document.getElementById('game-name').innerText = `${result[gameId].name}`
  document.getElementById('game-cover').innerHTML = `<img src="https://images.igdb.com/igdb/image/upload/t_cover_big/${result[gameId].cover.image_id}.jpg">`
  console.log(result)
}

getGame()