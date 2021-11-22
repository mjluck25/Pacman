document.addEventListener('DOMContentLoaded',() => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const width = 28 // 28x28 = 784 squares
  let score = 0

  //layout of grid and what is in the squares
  const layout = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,4,1,1,1,5,5,1,1,1,4,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,3,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,3,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  const squares = []
  //Legend
  //0 - pac-dot
  //1 - wall
  //2 - ghost-lair
  //3 - power-pellet
  //4 - empty
  //5 - gate


//draw the grid and render it
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div') //creates a div
      grid.appendChild(square) //appends the created divs into the grid
      squares.push(square) //adds the divs as arrays to the 'squares' array
    

    //add layout to the board by adding class per item in the layout array
      if (layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
      } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
      } else if (layout[i] === 5) {
        squares[i].classList.add('gate')
      }
    }
  }

createBoard()

//starting position of pac-man
  let pacmanCurrentIndex = 364
  squares[pacmanCurrentIndex].classList.add('pac-man')

//move pac-man
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    
    //keyCodes are a given numbers for keys in javascript
    switch (e.keyCode) {
      case 37:  //keyCode for Left arrow key
        if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) pacmanCurrentIndex -= 1

        //check if pacman in in the left exit
        if ((pacmanCurrentIndex - 1) === 363) {
          pacmanCurrentIndex = 391
          squares[364].classList.remove('pac-man')
        }

        break
      case 38:  //keyCode for up arrow key
        if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) pacmanCurrentIndex -= width
        break
      case 39:  //keyCode for right arrow key
        if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) pacmanCurrentIndex += 1
        //check if pacman in in the right exit
        if ((pacmanCurrentIndex + 1) === 392) {
          pacmanCurrentIndex = 364
          squares[391].classList.remove('pac-man')
        }
        break
      case 40:  //keyCode for down arrow key
        if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex + width].classList.contains('gate')) pacmanCurrentIndex += width
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')

    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
  }

  document.addEventListener('keyup', movePacman)
                            //keyup event is fired when a key is released

  //what happens when Pac-man eats a pac-dot
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
    };
  }

  function powerPelletEaten (){
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score += 10
      scoreDisplay.innerHTML = score
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhosts, 10000)
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }
  
  function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }
  //create our Ghost template

  class Ghost{
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.timerId = NaN
      this.isScared = false
      this.isEaten = false
    }
  }

  ghosts = [
    new Ghost('blinky', 348, 300),
    new Ghost('pinky', 376, 500),
    new Ghost('inky', 351, 400),
    new Ghost('clyde', 379, 600)
]


//draw my ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
  })

//move the ghosts randomly
  
  ghosts.forEach(ghost => moveGhost(ghost))

//write the function to move the ghosts
  function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function () {
      //if the next square your ghost is going to go in does NOT contain a wall and a ghost, you can go there
      if (!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
        //you can go here
        //remove all ghost related classes
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        //change the currentIndex to the new safe square
        ghost.currentIndex += direction
        //redraw the ghost in the new safe place
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
      //else find a new direction to try
      else direction = directions[Math.floor(Math.random() * directions.length)]
      //if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //if the ghost is scared and pacman runs into it
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score += 50
        scoreDisplay.innerHTML = score
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        ghost.isEaten = true
      }

      //if ghost is eaten, gets locked up in ghost lair
      if (ghost.isEaten && squares[ghost.currentIndex + direction].classList.contains('gate')) {
        direction = directions[Math.floor(Math.random() * (directions.length - 1))]
      }
      checkForGameOver()

    }, ghost.speed)
  }
  //check for a gameover
  function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function () { alert('Game Over! Your Score: ' + scoreDisplay.innerHTML) }, 50)
      // or scoreDisplay.innerHTML = 'Game Over'
    }
  }

  //check for a win
  function checkForWin() {
    if (score >= 300) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      scoreDisplay.innerHTML = 'YOU WON!'
    }
  }



})