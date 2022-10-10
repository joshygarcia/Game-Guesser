let nextBtn = ''
let prevBtn = ''
let sliderImagesEl = ''
let gameOptionsContainer = ''
const startBtn = document.getElementById('start-btn')
const mainContainer = document.getElementById('main-container')

let gameOptionsEl = []
let gamesArray = []
let gameName = ''

let slides = ''
let numberOfSlides =''
let slideNumber = 0

const openPopupBtn = document.querySelector('.popup-open-btn')
const closePopupBtn = document.querySelector('.popup-close-btn')
const popup = document.getElementById('popup')
const overlay = document.getElementById('overlay')

openPopupBtn.addEventListener('click', () => {
  popup.classList.add('active')
  overlay.classList.add('active')
})

closePopupBtn.addEventListener('click', () => {
  popup.classList.remove('active')
  overlay.classList.remove('active')
})

overlay.addEventListener('click', () => {
  popup.classList.remove('active')
  overlay.classList.remove('active')
})

const options = {
    method: 'POST',
    headers: {
      'x-api-key': 'tsPjq6JmoB5sTRDZN8Cdibk9oREX4lk5jR9mHEKj'
    },
    body: 'fields name,cover.image_id,url,similar_games.name,screenshots.image_id; where total_rating_count > 100; limit 500;'
}
  
const fetchGame = async () => {
  const response = await fetch('https://7nzuvxklga.execute-api.us-west-2.amazonaws.com/production/v4/games', options)
  const data = await response.json()

  return data
}

const startGame = async () => {


  mainContainer.innerHTML = `
    <img class="logo-in-game" src="GameGuesserLogo.png" alt="">
    <div id="game-images-slider">
      <div id="slider-images"></div>
      <div id="image-nav">
          <i class="fa-solid fa-arrow-left prev-btn"></i>
          <i class="fa-solid fa-arrow-right next-btn"></i>
      </div>
    </div>
    <div id="game-options-container"></div>
      `

  sliderImagesEl = document.getElementById('slider-images')
  gameOptionsContainer = document.getElementById('game-options-container')

  prevBtn = document.querySelector(".prev-btn")
  nextBtn = document.querySelector(".next-btn")

  const result = await fetchGame()
  gamesArray = await result

  renderGame()
  createSlider()
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

const createSlider = () =>{
  
  nextBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
      slide.classList.remove("active")
    });
    
    slideNumber++

    if(slideNumber > (slides.length - 1)){ 
    slideNumber = 0
    }
    slides[slideNumber].classList.add("active")
  });

  prevBtn.addEventListener("click", () => {

    slides.forEach((slide) => {
      slide.classList.remove("active")
    });
    
    slideNumber--

    if(slideNumber < 0){ 
    slideNumber = slides.length -1
    }
    slides[slideNumber].classList.add("active")
  })
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

startBtn.addEventListener('click', () =>{
  startGame()
})