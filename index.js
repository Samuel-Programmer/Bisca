
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
    alert('Player' + (gameBoard.playerTurn + 1) + ' your turn to start');
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
        this.cardInPlay = [];
        this.turnPoints = [];
        this.roundPoints = 0
    }
}

class Board {
    constructor() {
        this.players = [];
        this.numberOfPlayers = 0;
        this.round = 0;
        this.turn = 1;
        this.playerTurn = 0;
        this.roundTotals = []
    }

    start(playerOneName, playerTwoName) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        this.numberOfPlayers = this.players.length;

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
        gameBoard.players[gameBoard.playerTurn][playerHandReference] = 'placeHolder';

        if (gameBoard.playerTurn == 0) {
            gameBoard.playerTurn = 1;
        } else {
            gameBoard.playerTurn = 0;
        }

        if (gameBoard.players[0].cardInPlay.value && gameBoard.players[1].cardInPlay.value){
            gameBoard.scoreTurn();
            for (let i = 0; i < gameBoard.numberOfPlayers; i ++) {
                $("." + gameBoard.players[i].playerName + "inplay").removeClass(gameBoard.players[i].cardInPlay.suit + gameBoard.players[i].cardInPlay.rank)
            }
            alert('Player' + (gameBoard.playerTurn + 1) + ' your turn next');
            gameBoard.newTurn();
            d.dealDeck();
        }
    }

    newTurn(){
        for (let i = 0; i < gameBoard.numberOfPlayers; i ++) {
            gameBoard.players[i].cardInPlay = [];
        }

        gameBoard.turn ++;

        if (gameBoard.turn === 21){
            gameBoard.scoreRound();
        }
    }

    scoreTurn(){
        let player1Score = parseInt(gameBoard.players[0].cardInPlay.value);
        let player2Score = parseInt(gameBoard.players[1].cardInPlay.value);

        if (player1Score > player2Score) {
            gameBoard.players[0].turnPoints.push(player1Score);
            gameBoard.playerTurn = 0;
            alert('Player1 Wins the turn');
        } else if (player2Score > player1Score) {
            gameBoard.players[1].turnPoints.push(player2Score);
            gameBoard.playerTurn = 1;
            alert('Player2 Wins the turn');
        }
    }

    scoreRound(){
        alert('Who is the round winner?!?!');

        for (let i = 0; i < gameBoard.numberOfPlayers; i ++) {
            var sum = (gameBoard.players[i].turnPoints).reduce(function(a, b){
                return a + b;
            }, 0);

            gameBoard.roundTotals.push(sum);
        }

        let winningScore = Math.max(...(gameBoard.roundTotals));
        let winningPlayerIndex = gameBoard.roundTotals.indexOf(winningScore);

        alert(gameBoard.players[winningPlayerIndex].playerName + ' is the round winner');
        gameBoard.players[winningPlayerIndex].roundPoints + 1;

        if (gameBoard.players[winningPlayerIndex].roundPoints >= 3) {
            alert(gameBoard.players[winningPlayerIndex].playerName + ' Wins the game!!!');
        } else {
            alert('Next round guys!');
        }
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
        let rank = ['ace', '2', '3', '4', '5', '6', '7', 'jack', 'queen', 'king'];
        let value = ['11', '0', '0', '0', '0', '0', '10', '3', '2', '4'];

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
                
                    if (gameBoard.players[i]['playerCard' + j] === 'placeHolder' && gameBoard.turn <= 17) {
                    $(CardPlaceHolder).removeClass(gameBoard.players[i]['playerCard' + j].suit + gameBoard.players[i]['playerCard' + j].rank);
                    gameBoard.players[i]['playerCard' + j] = topCard;
                    $(CardPlaceHolder).addClass(gameBoard.players[i]['playerCard' + j].suit + gameBoard.players[i]['playerCard' + j].rank);
                    this.cards.pop();
                }
            }
        }
    }
} 