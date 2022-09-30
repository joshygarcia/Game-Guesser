
const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer g74lo321qgjm43qxal6e6dh2m00egq',
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
  // document.getElementById('game-name').innerText = `${result[0].name}`
  document.getElementById('game-cover').innerHTML = `<img src="https://images.igdb.com/igdb/image/upload/t_cover_big/${result[0].cover.image_id}.jpg">`
  console.log(result)
}

getGame()