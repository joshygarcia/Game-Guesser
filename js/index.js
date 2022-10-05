const sliderImagesEl = document.getElementById('slider-images')
const gameOptionsContainer = document.getElementById('game-options-container')
let gameOptionsEl = []
let gamesArray = []

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
let slides = ''
let numberOfSlides =''

let slideNumber = 0;

nextBtn.addEventListener("click", () => {

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  
  slideNumber++;

  if(slideNumber > (slides.length - 1)){ 
  slideNumber = 0;
  }
  slides[slideNumber].classList.add("active")
});

prevBtn.addEventListener("click", () => {

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  
  slideNumber--;

  if(slideNumber < 0){ 
  slideNumber = slides.length -1;
  }
  slides[slideNumber].classList.add("active")
});

let gameName = ''

const getApiKey =  async () => {
  const response = await fetch('https://id.twitch.tv/oauth2/token?client_id=xa1693c4tecsc6kp8m5hh5yemzube8&client_secret=zilm2kgj0lrbdrye67s74033j175qt&grant_type=client_credentials', {method: 'POST'})
  const data = await response.json()

  apikey = data.access_token
  localStorage.setItem('apikey', apikey)
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
    body: 'fields name,cover.image_id,url,similar_games.name,screenshots.image_id; where total_rating_count > 100; limit 500;'
}
  
const fetchGame = async () => {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games?', options)
  const data = await response.json()

  return data
}

const startGame = async () => {
  const result = await fetchGame()
  gamesArray = await result

  renderGame()  
}

const renderGame = () => {
  const gameId = Math.floor(Math.random() * gamesArray.length)

  const gameOptionsHtml = getGameOptionsHtml(gamesArray[gameId].name, gamesArray[gameId].similar_games)
  const gameImagesHtml = getGameImagesHtml(gamesArray[gameId].screenshots)

  gameName = `${gamesArray[gameId].name}`
  sliderImagesEl.innerHTML = gameImagesHtml
  gameOptionsContainer.innerHTML = gameOptionsHtml

  slides = document.querySelectorAll(".slide");
  slides[0].classList.add('active')

  gameOptionsEl = document.querySelectorAll('.game-option')
  
  for(option of gameOptionsEl){
    option.addEventListener('click', e => {
      e.stopPropagation()
      if(e.target.innerText == gameName) {
        e.target.classList.add('correct')
        console.log('Correct')
        setTimeout(renderGame,1500)
      }
      else {
        e.target.classList.add('incorrect')
        console.log('Incorrect')
      }
    })
  }

  gamesArray.splice(gameId, 1)
}

const getGameOptionsHtml = (name, similar_games) => {
  let optionsHtml = ''
  let result = []
  result.push(name)
  for (let i = 0; i <= 2; i++) {
    let randomIndex = Math.floor(Math.random() * similar_games.length)
    result.push(similar_games[randomIndex].name)
    similar_games.splice(randomIndex, 1)
  }
  shuffleArray(result)  
  for(game of result) {
    optionsHtml += `<button class="game-option" id="game">${game}</button>`
  }
  return optionsHtml
}

const getGameImagesHtml = (screenshotsArr) => {
  let result = []
  let imagesHtml = ''
  for (let i = 0; i <= 3; i++) {
    let randomIndex = Math.floor(Math.random() * screenshotsArr.length)
    result.push(screenshotsArr[randomIndex].image_id)
    screenshotsArr.splice(randomIndex, 1)
  }
  for(image of result) {
    imagesHtml += `<div class="slide">
                      <img src="https://images.igdb.com/igdb/image/upload/t_720p/${image}.jpg" class="game-img">
                  </div>`
  }
  return imagesHtml
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

startGame()