const startBtn = document.querySelector('#start')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const screens = document.querySelectorAll('.screen')

let time = 0
let score = 0
const colors = ['#ff5fcf', '#6146f7', '#8c61cb', '#eea15a', '#e8a909', '#F78446BA',
    '#b3f746', '#46f781', 'rgb(70,247,176)', '#16D9E3', '#30C7EC', '#46AEF7']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame(time)
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    // небольшое улучшение фукции. Мой внутренний перфекционист не давал мне сдать задание без этого.
    let count = setInterval(decreaseTime, 1000)
    setTimeout(() => {
        clearInterval(count)
    }, ((time + 2) * 1000))
    setTime(time)
    createRandomCircle()
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(time) {
    timeEl.innerHTML = `00:${time}`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNumber(20, 70)
    const { width, height } = board.getBoundingClientRect()
    const positionX = getRandomNumber(0, width - size)
    const positionY = getRandomNumber(0, height - size)
    const randColor = Math.floor(Math.random() * colors.length)

    circle.style.top = `${positionY}px`
    circle.style.left = `${positionX}px`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.background = `linear-gradient(90deg, ${colors[randColor]} 0%, ${colors[randColor + 1]} 47%)`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
