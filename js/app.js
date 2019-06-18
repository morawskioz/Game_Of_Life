import $ from "jquery"

$(function() {
  function GameOfLife() {
    this.createBoard = function() {
      this.width = $("#boardSize").val()
      this.height = $("#boardSize").val()
      this.board = $("#board")
      this.board.css("width", this.width * 10)
      this.board.css("height", this.height * 10)
      var numberOfFields = this.width * this.height
      for (let i = 0; i < numberOfFields; i++) {
        var newDiv = $(`<div id=${i}>`)
        this.board.append(newDiv)
      }
      this.allCells = this.board.find("div")
      this.allCells.on("mouseover", function() {
        $(this).toggleClass("live")
      })
    }
    this.index = function(x, y) {
      return x + y * self.width
    }
    this.setCellState = function(x, y, state) {
      this.allCells[this.index(x, y)].classList.toggle(state)
    }
    this.firstGlider = function() {
      this.setCellState(3, 3, "live")
      this.setCellState(4, 4, "live")
      this.setCellState(5, 4, "live")
      this.setCellState(5, 2, "live")
      this.setCellState(5, 3, "live")
    }
    var self = this

    this.checkIfCellAlive = function(x, y) {
      const index = self.index(x, y)
      const currentCell = self.allCells[index]
      return !!currentCell && currentCell.classList.contains("live")
    }

    this.computeCellNextState = function(x, y) {
      let counter = 0
      for (let xx = -1; xx <= 1; xx++) {
        for (let yy = -1; yy <= 1; yy++) {
          if (xx === 0 && yy === 0) {
            continue
          } else if (self.checkIfCellAlive(x + xx, y + yy)) {
            counter++
          }
        }
      }

      if ((self.checkIfCellAlive(x, y) && counter === 2) || counter === 3) {
        return 1
      }
      return 0
    }

    this.computeNextGeneration = function() {
      var futureState = []
      for (let i = 0; i < self.width; i++) {
        for (let j = 0; j < self.height; j++) {
          futureState.push(self.computeCellNextState(j, i))
        }
      }
      self.clearTheBoard()
      self.printNextGeneration(futureState)
    }
    this.printNextGeneration = function(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === 1) {
          self.allCells[i].classList.add("live")
        }
      }
    }
    this.startGame = function() {
      self.idSetInterval = setInterval(self.computeNextGeneration, 100)
    }
    this.clearTheBoard = function() {
      for (let i = 0; i < self.allCells.length; i++) {
        self.allCells[i].classList.remove("live")
      }
    }
  }

  var game = new GameOfLife()

  var createBoard = $("#createBoard")
  createBoard.on("click", function(e) {
    e.preventDefault()
    const oneBoard = $("#board")
    const tip = $(".tips")
    if (oneBoard.hasClass("boardCreated")) {
      alert("The board is already there! You cannot create a new one. Tey F5.")
    } else {
      game.createBoard()
      game.firstGlider()
      oneBoard.addClass("boardCreated")
      tip.addClass("visible")
    }
  })
  var playButton = $("#play")
  playButton.on("click", function() {
    clearInterval(game.idSetInterval)
    game.idSetInterval = null
    game.startGame()
  })
  var pauseButton = $("#pause")
  pauseButton.on("click", function() {
    clearInterval(game.idSetInterval)
  })
  var resetButton = $("#reset")
  resetButton.on("click", function() {
    game.clearTheBoard()
    game.firstGlider()
  })
})
