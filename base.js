// arrays
var colors  = ["red","blue","green","yellow"];
var pattern = [];
var user = [];
var flag = false;
var level  = 0 ;

// starting
$(document).keypress(function(){
    if (!flag){
        $("#level-title").text("Level " + level);
        sequence();
        flag = true;
    }
});
// sound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// animation
function animate(name){
    $("#"+name).addClass("pressed");
    setTimeout(function() {
       $("#"+name).removeClass("pressed")
    }, 100);
}

// eventlistner
$(".btn").click(function(){
    var chosenColor = $(this).attr("id");
    user.push(chosenColor);
    playSound(chosenColor);
    animate(chosenColor);
    checker(user.length-1);
});


// checking the pattern
function checker(gameLevel){
    if (pattern[gameLevel] === user[gameLevel]){
        if (pattern.length === user.length){
            setTimeout(function(){
                sequence();
            },500);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
 
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        newGame();
    }
}

// restarting game
function newGame(){
    level=0;
    pattern=[];
    flag = false;
}

// game logic
function sequence(){
    user = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNum = Math.floor(Math.random() * 4);
    var col  = colors[randomNum];
    pattern.push(col);
    $("#"+col).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(col);
}


