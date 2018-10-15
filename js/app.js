$(function () {

    function GameOfLife ( ) {

        this.createBoard = function (){
            this.width = $("#board__size").val();
            this.height = $("#board__size").val();
            this.board = $("#board");
            this.board.css("width" , this.width*10);
            this.board.css("height" , this.height*10);
            var number__of__fields = this.width * this.height;
            for (i = 0 ; i < number__of__fields; i++) {
                var new__Div = $("<div>");
                this.board.append(new__Div)
            }
            this.cell = this.board.find("div");
            this.cell.on("mouseover", function () {
                $(this).toggleClass("live")
            });

        };
        this.index = function (x, y) {
            return x + (y * self.width);

        };
        this.setCellState = function(x, y, state) {
            this.cell[this.index(x,y)].classList.toggle(state)
        };
        this.firstGlider =  function (){
            this.setCellState(3,3,"live");
            this.setCellState(4,4,"live");
            this.setCellState(5,4,"live");
            this.setCellState(5,2,"live");
            this.setCellState(5,3,"live");
        };
        var self = this;
        this.computeCellNextState = function(x, y) {
            var counter = 0;
            if (typeof(self.cell[self.index(x - 1,y - 1)]) !== 'undefined' && (self.cell[self.index(x - 1,y - 1)]) !== null) {
                if (self.cell[self.index(x - 1, y - 1)].classList.contains("live")) {
                    counter++
                }
            }
            if (typeof(self.cell[self.index(x ,y - 1)]) !== 'undefined' && (self.cell[self.index(x - 1,y - 1)]) !== null)
            {
                if (self.cell[self.index(x ,y - 1)].classList.contains("live")){
                    counter++
                }
            }
            if (typeof(self.cell[self.index(x + 1, y - 1)]) !== 'undefined' && (self.cell[self.index(x - 1,y - 1)]) !== null)
            {
                if (self.cell[self.index(x + 1, y - 1)].classList.contains("live")){
                    counter++
                }
            }
            if (typeof(self.cell[self.index(x - 1,y)]) !== 'undefined' && (self.cell[self.index(x - 1,y - 1)]) !== null)
            {
                if (self.cell[self.index(x - 1,y)].classList.contains("live")){
                    counter++
                }
            }
            if (typeof(self.cell[self.index(x + 1,y)]) !== 'undefined' && (self.cell[self.index(x - 1,y - 1)]) !== null)
            {
                if (self.cell[self.index(x + 1,y)].classList.contains("live")){
                    counter++
                }
            }
            if (typeof(self.cell[self.index(x - 1,y + 1)]) !== 'undefined' && (self.cell[self.index(x - 1,y - 1)]) !== null)
            {
                if (self.cell[self.index(x - 1,y + 1)].classList.contains("live")){
                    counter++
                }
            }
            if (typeof(self.cell[self.index(x,y + 1)]) !== 'undefined' && (self.cell[self.index(x - 1,y - 1)]) !== null)
            {
                if (self.cell[self.index(x,y + 1)].classList.contains("live")){
                    counter++
                }
            }
            if (typeof(self.cell[self.index(x + 1,y + 1)]) !== 'undefined' && (self.cell[self.index(x - 1,y - 1)]) !== null)
            {
                if (self.cell[self.index(x + 1,y + 1)].classList.contains("live")){
                    counter++
                }
            }

            if  (!(self.cell[self.index(x,y)].classList.length === 0) && (counter === 2 || counter === 3 )){
                return 1}
            else if (self.cell[self.index(x,y)].classList.length === 0 && counter === 3  ){
                return 1
            }
            else {
                return 0
            }
        };

        this.computeNextGeneration = function() {
            var future__state = [];
            for (i=0 ; i < self.width; i++){
                for (j = 0 ;j < self.height; j++){
                    future__state.push(self.computeCellNextState(j,i));
                }
            }
            self.clear__the__board();
            self.printNextGeneration(future__state);
        };
        this.printNextGeneration = function (array) {
            for (i = 0; i < array.length; i++ ){
                if (array[i] === 1) {
                    self.cell[i].classList.add("live")
                }
            }
        };
        this.startGame = function () {
            self.idSetInterval = setInterval(self.computeNextGeneration, 100)
        };
        this.clear__the__board = function () {
            for (i=0; i< self.cell.length; i++){
                self.cell[i].classList.remove("live")
            }
        }

    }

    var game = new GameOfLife();

    var create__board = $("#create__board");
    create__board.on("click", function (e) {
        e.preventDefault();
        game.createBoard();
        game.startGame();
        game.firstGlider()

    });
    var play__button = $("#play");
    play__button.on("click", function () {

            clearInterval(game.idSetInterval);
            game.idSetInterval = null;
            game.startGame();
    });
    var pause__button = $("#pause");
    pause__button.on("click", function () {
        clearInterval(game.idSetInterval)
    });
    var reset__button = $("#reset");
    reset__button.on("click", function () {
        game.clear__the__board();
        game.firstGlider()
    })

});

