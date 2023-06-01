
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$("body").click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    if (started == true){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function flashBox(num){
    if (num < gamePattern.length){
      
        $('#' + gamePattern[num]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[num]);

        setTimeout(function() {
            console.log('delay');
            setTimeout(function(){
                flashBox(++num);
                console.log(num);
            }, 0);
        }, 500);
        
    }else if(0 < gamePattern.length){
       return;
    }else{
        $('#' + gamePattern[num]).fadeOut(100).fadeIn(100);
        return;
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    flashBox(0);

};

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.1; 
    audio.play();
}

function animatePress(currentColour) {

    $('#' + currentColour).addClass('pressed');

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log('Success');
        if (userClickedPattern.length == gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

};


function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}



