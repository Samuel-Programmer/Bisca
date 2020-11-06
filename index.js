
// event listener for deal button 

$(".deal").click(function() {
    d.dealDeck();
});


// Event listener for start button

$(".start").click(function() {
    d = new Deck();
    d.createDeck();
    d.shuffleDeck();
    gameBoard = new Board();
    gameBoard.start("player1", "player2");
    d.dealDeck();
});


// Event listener for placing a card to take turn

$(".hand").click(function(e) {
    gameBoard.playCard(e.target.classList);
    
})

// Classes

class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCard0 = 'placeHolder';
        this.playerCard1 = 'placeHolder';
        this.playerCard2 = 'placeHolder';
        this.cardInPlay = []
        this.points = []
    }
}

class Board {
    constructor() {
        this.players = [];
        this.round = 0;
        this.turn = 0;
        this.playerTurn = 0
    }

    start(playerOneName, playerTwoName) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));

        // console.log(gameBoard.players);
    }

    playCard(targetCard){
        let cardClass = targetCard[3];
        let turnCardPlcaeHolder = "." + gameBoard.players[gameBoard.playerTurn].playerName + "inplay";
        let handReference = (targetCard[2].slice(targetCard[2].length - 1, targetCard[2].length));
        let playerHandReference = 'playerCard' + handReference;


        $(turnCardPlcaeHolder).addClass(cardClass);
        targetCard.remove(cardClass);
        gameBoard.players[gameBoard.playerTurn].cardInPlay = gameBoard.players[gameBoard.playerTurn][playerHandReference];

        if (gameBoard.playerTurn == 0) {
            gameBoard.playerTurn = 1;
        } else {
            gameBoard.playerTurn = 0;
        }

        if (gameBoard.players[0].cardInPlay.value && gameBoard.players[1].cardInPlay.value){
            gameBoard.score();
        }
    }

    score(){
        let player1Score = parseInt(gameBoard.players[0].cardInPlay.value);
        console.log(player1Score);
        let player2Score = parseInt(gameBoard.players[1].cardInPlay.value);
        console.log(player2Score);

        if (player1Score > player2Score) {
            gameBoard.players[0].points.push(player1Score);
            alert('Player1 Wins');
        } else if (player2Score > player1Score) {
            gameBoard.players[1].points.push(player2Score);
            alert('Player2 Wins');
        }

        console.log(gameBoard);
    }
}

class Card {
    constructor(value, suit, rank) {
        this.value = value;
        this.suit = suit;
        this.rank = rank;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }

    createDeck() {
        let suit = ['clubs', 'spades', 'diamonds', 'hearts'];
        let rank = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        let value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

        for (let i = 0; i < suit.length; i++) {
            for (let j = 0; j < rank.length; j++) {
                this.cards.push(new Card(value[j], suit[i], rank[j]));
            }
        }
    }

    shuffleDeck() {
        var m = this.cards.length, t, i;

        // Pick a remaining element
        while (m) {
            i = Math.floor(Math.random() * m--);

            // Swap it with the current element
            t = this.cards[m];
            this.cards[m] = this.cards[i];
            this.cards[i] = t;
        }
    }

    dealDeck() {
        for ( let i = 0; i < gameBoard.players.length; i++) {
            for (let j = 0; j <= 2; j++) {
                let topCard = this.cards[this.cards.length-1];
                let CardPlaceHolder = "." + gameBoard.players[i].playerName + "hand" + j;
                // let cardClassID = gameBoard.players[i]['playerCard' + j].suit + gameBoard.players[i]['playerCard' + j].rank
                // let cardClass = gameBoard.players[i]['playerCard' + j];
                
                $(CardPlaceHolder).removeClass(gameBoard.players[i]['playerCard' + j].suit + gameBoard.players[i]['playerCard' + j].rank);
                gameBoard.players[i]['playerCard' + j] = topCard;
                $(CardPlaceHolder).addClass(gameBoard.players[i]['playerCard' + j].suit + gameBoard.players[i]['playerCard' + j].rank);
                this.cards.pop();
            }
        }
    }
} 