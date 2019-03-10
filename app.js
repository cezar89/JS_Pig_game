/*
THE PIG GAME

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



//First create the game variables
var scores, roundScores, activePlayer/*, dice*/;



//CREATE RANDOM NUMBERS 1 TO 6
//Math.random() - creates random numbers 0.xxx to 1
//Math.random() * 6 = 4.2314123412 (0 to 5)
//
//Math.floor(4.555) = 4
//
//Math.floor(Math.random * 6) + 1 = 1 to 6
/*dice = Math.floor(Math.random() * 6) + 1;*/
//console.log(dice);


//QUERY SELECTOR
//select elements in css and html
//id of the element current-0 and current-1
//textContent, gets the content of selects it. Can only change txt and not html

//document.querySelector('#current-0').textContent = dice;

//We can change the active player by creating the element in the query. Notice the current-....
//document.querySelector('#current-' + activePlayer).textContent = dice;


//innerHtml - will get or override the html from that tag. It has to be a string
//notice that <em> has an indent applied to the text inside it
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


//querySelector can be used also for reading an element
//var x = document.querySelector('#score-0').textContent;
//console.log(x);


init();


//EVENTS
//Events = Notifications sent to notify the code that something happened
//Event Listner = A function that performs an action based on a certaing event. It waits for a sepecific event to happen

//Now we will select the button ROLL DICE


//var btn = {
//    //Do something
//}

//addEventListner
//please see: developer.mozilla.org/en-us/docs/Web/Events
//btm is the callback function
//document.querySelector('.btm-roll').addEventListener('click', btn);

//For this we can use an anonymous function
document.querySelector('.btn-roll').addEventListener('click', function(){
    //1. We need the random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //2.Display the result
    //First display the dice
    var diceDOM = document.querySelector('.dice');
    //First display the dice
    diceDOM.style.display = 'block';
    //Display the image of the dice based on the dice value
    diceDOM.src = 'dice-' + dice + '.png'
    //Second
    
    //3.Update the round score ONLY IF the rolled number was NOT 1
    
    if (dice !== 1){
        //Add score
        roundScore += dice;
        //Set the content of the roundScore to the current player
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else{
        //We apply DRY priciple because we need the code from here to be the same as in the below function
        nextPlayer();
    }
});


//NOW LET'S ADD ANOTHER EVENT LISTNER
//FOR HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add CURRENT SCORE to GLOBAL SCORE
    scores[activePlayer] += roundScore;
    
    
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 
    
    
    //Check if player won the game
    if ( scores[activePlayer] >= 10 ){
        winGame();
    }
    else{

        //we will apply the DRY principle - don't repeat yourself
        //We implement the nextPlayer function
        nextPlayer(); 
    }
    
    

    
    

    
    
});



function nextPlayer(){
    //Next player
        //turnary operator
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        //set the roundScore back to 0
        roundScore = 0;
        
        //show on the screen 0 
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        
        //change the player visualy by changing the classes arround 
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        //we can use toggle
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //let's remove the dice when the new player is selected
        document.querySelector('.dice').style.display = 'none';
}

function winGame(){
    document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
    document.querySelector('#name-' + activePlayer).textContent = 'Winner';
    
    document.querySelector('.player-' + activePlayer +'-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}



//Let's enable the NEW GAME button
document.querySelector('.btn-new').addEventListener( 'click', init );




function init(){
    //Initialize the variable to 0;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;


    //querySelector can be used to change the css of the page
    //for the dice class - we want to hide the dice (notice the . is for classes)
    //we use .style.display to 'none' in order to hide the dice
    document.querySelector('.dice').style.display = 'none';


    //set all the values on the screen to 0
    //If we have just ids , we can use this. It is faster
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    //remove the winner classes and active classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    //add the active class back to the first one
    document.querySelector('.player-0-panel').classList.add('active');
}






















