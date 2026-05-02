$(document).ready(function () {

  const squares = $('.square')
  const timeLeft = $('#time-left')
  const score = $('#score')

  const hearts = $('.heart')
  let lives = hearts.length

  let result = 0
  let hitPosition = null
  let currentTime = 60

  let timerId = null
  let countDownTimerId = null
  let goldenTimer = null
  let clockTimer = null

  let moleWasClicked = true
  let isTimeSlowed = false
  let currentMode = "classic"
  let isPaused = false

  window.startGame = function (selectedMode) {
    $("#menu").hide()
    $("#game").css("display", "flex")
    currentMode = selectedMode
    setMode(selectedMode)
  }

  window.pauseGame = function () {
    if (isPaused) return
    isPaused = true

    clearInterval(timerId)
    clearInterval(countDownTimerId)
    clearInterval(goldenTimer)
    clearInterval(clockTimer)

    $('#btn-pause').hide()
    $('#btn-resume').show()
  }

  window.resumeGame = function () {
    if (!isPaused) return
    isPaused = false

    if (currentMode === "classic") {
      let speed = isTimeSlowed ? 1400 : 700
      timerId = setInterval(randomSquare, speed)
      goldenTimer = setInterval(spawnGoldenMole, isTimeSlowed ? 20000 : 10000)
      clockTimer = setInterval(spawnClock, 15000)
    } else if (currentMode === "challenge") {
      let speed = isTimeSlowed ? 800 : 400
      timerId = setInterval(randomSquare, speed)
      goldenTimer = setInterval(spawnGoldenMole, isTimeSlowed ? 14000 : 7000)
      clockTimer = setInterval(spawnClock, 12000)
    }

    countDownTimerId = setInterval(countDown, 1000)

    $('#btn-resume').hide()
    $('#btn-pause').show()
  }

  window.restartGame = function () {
    setMode(currentMode)
    $('#btn-resume').hide()
    $('#btn-pause').show()
  }

  window.exitGame = function () {
    clearInterval(timerId)
    clearInterval(countDownTimerId)
    clearInterval(goldenTimer)
    clearInterval(clockTimer)
    
    $("#game").hide()
    $("#menu").show()
  }

  function randomSquare() {
    if (isPaused) return

    if (!moleWasClicked) {
      loseLife()
    }

    moleWasClicked = false
    squares.removeClass('mole')

    let random = squares.eq(Math.floor(Math.random() * squares.length))

    setTimeout(() => {
      if (isPaused) return
      random.addClass('mole')
      hitPosition = random.attr('id')
    }, 80)
  }

  function spawnGoldenMole() {
    if (isPaused) return
    squares.removeClass('golden_mole')

    let random = squares.eq(Math.floor(Math.random() * squares.length))
    random.addClass('golden_mole')

    setTimeout(() => {
      random.removeClass('golden_mole')
    }, 500)
  }

  function spawnClock() {
    if (isPaused) return
    squares.removeClass('clock')

    let availableSquares = squares.not('.mole').not('.golden_mole')
    if (availableSquares.length === 0) return

    let random = availableSquares.eq(Math.floor(Math.random() * availableSquares.length))
    random.addClass('clock')

    setTimeout(() => {
      random.removeClass('clock')
    }, 2000)
  }

  function activateSlowMotion() {
    if (isTimeSlowed || isPaused) return
    isTimeSlowed = true

    clearInterval(timerId)
    clearInterval(goldenTimer)

    if (currentMode === "classic") {
      timerId = setInterval(randomSquare, 1400)
      goldenTimer = setInterval(spawnGoldenMole, 20000)
    } else if (currentMode === "challenge") {
      timerId = setInterval(randomSquare, 800)
      goldenTimer = setInterval(spawnGoldenMole, 14000)
    }

    setTimeout(() => {
      isTimeSlowed = false
      if (isPaused) return

      clearInterval(timerId)
      clearInterval(goldenTimer)

      if (currentMode === "classic") {
        timerId = setInterval(randomSquare, 700)
        goldenTimer = setInterval(spawnGoldenMole, 10000)
      } else if (currentMode === "challenge") {
        timerId = setInterval(randomSquare, 400)
        goldenTimer = setInterval(spawnGoldenMole, 7000)
      }
    }, 5000)
  }

  function updateLives() {
    if (lives >= 0 && lives < hearts.length) {
      hearts.eq(lives).addClass('dead')
    }
  }

  function loseLife() {
    lives--
    updateLives()

    if (lives <= 0) {
      gameOver()
    }
  }

  squares.on('mousedown', function () {
    if (isPaused) return

    let square = $(this)

    if (square.attr('id') == hitPosition) {
      result++
      score.text(result)

      moleWasClicked = true
      hitPosition = null
      square.removeClass('mole')
    }

    if (square.hasClass('golden_mole')) {
      result += 3
      score.text(result)
      square.removeClass('golden_mole')
    }

    if (square.hasClass('clock')) {
      square.removeClass('clock')
      activateSlowMotion()
    }
  })

  function countDown() {
    if (isPaused) return
    currentTime--
    timeLeft.text(currentTime)

    if (currentTime == 0) {
      gameOver()
    }
  }

  function gameOver() {
    clearInterval(timerId)
    clearInterval(countDownTimerId)
    clearInterval(goldenTimer)
    clearInterval(clockTimer)

    alert('GAME OVER! Score: ' + result)
    location.reload()
  }

  function setMode(mode) {
    clearInterval(timerId)
    clearInterval(countDownTimerId)
    clearInterval(goldenTimer)
    clearInterval(clockTimer)

    result = 0
    currentTime = 60
    score.text(result)
    timeLeft.text(currentTime)

    lives = hearts.length
    hearts.removeClass('dead')

    moleWasClicked = true
    isTimeSlowed = false
    isPaused = false

    squares.removeClass('mole golden_mole clock')

    if (mode === "classic") {
      timerId = setInterval(randomSquare, 700)
      goldenTimer = setInterval(spawnGoldenMole, 10000)
      clockTimer = setInterval(spawnClock, 15000)
    }

    if (mode === "challenge") {
      timerId = setInterval(randomSquare, 400)
      goldenTimer = setInterval(spawnGoldenMole, 7000)
      clockTimer = setInterval(spawnClock, 12000)
    }

    countDownTimerId = setInterval(countDown, 1000)
  }

})