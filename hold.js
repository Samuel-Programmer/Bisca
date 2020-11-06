
// Starting functions before progression to objects


/*

function shuffle(array) {
    
    let newArray = [];
    arrayCopy = [...array];

    for (i=52; i>0; i--) {
        let randomPick = Math.floor((Math.random() * arrayCopy.length));

        newArray.push(arrayCopy[randomPick]);
        arrayCopy.splice(randomPick, 1);
    }
    return newArray;
}

function fyShuffle(array) {

    // While there reamins elements to shuffle
    var m = array.length, t, i;

    // Pick a remaining element
    while (m) {
        i = Math.floor(Math.random() * m--);

        // Swap it with the current element
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function deal(array) {
    for (i=1; i<=3; i++) {
        $(".hand" + i).addClass(array[array.length-1]);
        $(".hand" + i).toggleClass("hasCard");
        array.pop();
    }
    return array;
}    

*/


/*

dealDeck() {
        for ( let i = 0; i < gameBoard.players.length; i++) {
            for (let j = 0; j <= 2; j++) {
                let topCard = this.cards[this.cards.length-1];
                $("." + gameBoard.players[i].playerName + "hand" + j).removeClass(gameBoard.players[i].playerCards[j]);
                gameBoard.players[i].playerCards[j] = (topCard.value + topCard.suit);
                $("." + gameBoard.players[i].playerName + "hand" + j).addClass(gameBoard.players[i].playerCards[j]);
                this.cards.pop();
            }
        }
    }

    */