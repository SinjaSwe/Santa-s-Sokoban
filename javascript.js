"use strict";

var player_Y = -1;
var player_X = -1;
var xposition = 11; //global variable 
var yposition = 11; //global variable 

//------------------------Create Element To Contain Map--------------------------------

var myMap = document.getElementById("myMap"); //Create a element with a id to contain your map.

myMap.innerHTML = "";

var myBody = document.getElementsByTagName("body")[0]

myBody.style.backgroundColor = "lightgrey";

console.log(myMap); 

myMap.style.width = (tileMap01.width * 37) + "px";
myMap.style.height = (tileMap01.height * 37) + "px";
createMap();
keysPressed();
mapGoals();

//------------------------Create Function to Generate Map--------------------------------

function createMap(){
    for (let y = 0; y < tileMap01.height; y++) 
        {
        for (let x = 0; x < tileMap01.width; x++) 
        {
            const element = document.createElement("div");
            element.classList.add("box");

            console.log(tileMap01.mapGrid[y][x]);

            if (tileMap01.mapGrid[y][x] == " ") {
            element.classList.add("space");

            } else if (tileMap01.mapGrid[y][x] == "W") {
            element.classList.add("wall");

            } else if (tileMap01.mapGrid[y][x] == "G") {
            element.classList.add("goal");

            } else if (tileMap01.mapGrid[y][x] == "B") {
            element.classList.add("block");

            } else if (tileMap01.mapGrid[y][x] == "P") {
            element.classList.add("character");
            player_Y = y;
            player_X = x;
            }

            element.id = "x" + x + "y" + y;

            myMap.appendChild(element); //Append them into your map element
        }
    } return tileMap01; 
}

//------------------------Event Listerner to key presses--------------------------------

function keysPressed (){
    document.addEventListener('keydown', movePlayer); 
}

function mapGoals()
{
    $(".goal").each(function() {
        $(this).attr('rel', 'goal');
    });
}

//------------------------Fucntion Arrowkeys--------------------------------

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {        // up arrow
    }
    else if (e.keyCode == '40') {   // down arrow
    }
    else if (e.keyCode == '37') {   // left arrow
    }
    else if (e.keyCode == '39') {   // right arrow
    }
}

//------------------------Move Player Function--------------------------------

function movePlayer (e){
    e.preventDefault();
    var newXPosition = xposition;
    var newYPosition = yposition;    
    var direction = '';
    var doUpdate = true;

    if( e.keyCode == 37  ){//left arrow
        newXPosition = xposition -1;
        direction = 'LEFT';
    }    
    else if( e.keyCode == 39 ){ //right arrow
        newXPosition = xposition + 1;
        direction = 'RIGHT';
    }    
    else if( e.keyCode == 38 ){ //up arrow
        newYPosition = yposition -1;
        direction = 'UP';
    }    
    else if( e.keyCode == 40){ //down arrow
        newYPosition = yposition + 1;
        direction = 'DOWN';
    }
    else
    {
        doUpdate = false;
    }    
    
    if( window.tileMap01.mapGrid[newYPosition][newXPosition] == 'W')
    {
        var doUpdate = false;
    }
    else if( window.tileMap01.mapGrid[newYPosition][newXPosition] == 'B')
    {
        if (direction == 'LEFT')
        {
            if( window.tileMap01.mapGrid[newYPosition][newXPosition-1] == 'W' || window.tileMap01.mapGrid[newYPosition][newXPosition-1] == 'B')
            {
                var doUpdate = false;
            }
            else
            {
                moveObject('B', newXPosition-1, newYPosition, newXPosition, newYPosition);
            }    
        }
        else if (direction == 'RIGHT')
        {
            if( window.tileMap01.mapGrid[newYPosition][newXPosition+1] == 'W' || window.tileMap01.mapGrid[newYPosition][newXPosition+1] == 'B')
            {
                var doUpdate = false;
            }
            else
            {                
                moveObject('B', newXPosition+1, newYPosition, newXPosition, newYPosition);
            }    
        }
        else if (direction == 'UP')
        {
            if( window.tileMap01.mapGrid[newYPosition-1][newXPosition] == 'W' || window.tileMap01.mapGrid[newYPosition-1][newXPosition] == 'B')
            {
                var doUpdate = false;
            }
            else
            {
                moveObject('B', newXPosition, newYPosition-1, newXPosition, newYPosition);
            }    
        }
        else if (direction == 'DOWN')
        {
            if( window.tileMap01.mapGrid[newYPosition+1][newXPosition] == 'W' || window.tileMap01.mapGrid[newYPosition+1][newXPosition] == 'B')
            {
                var doUpdate = false;
            }
            else
            {
                moveObject('B', newXPosition, newYPosition+1, newXPosition, newYPosition);
            }    
        }
    }
    
    if (doUpdate)
    {
        moveObject('P', newXPosition, newYPosition, xposition, yposition);
    }

    checkIfGameWon();
}

//------------------------Check if Won--------------------------------

function checkIfGameWon()
{
    var counter = 0;
    $(".block").each(function() 
    {
        var rel = $(this).attr('rel');
        if (rel == 'goal')
        {
            counter++;
        }
    });

    if (counter == 6)
    {
        alert('You won!!');
    }
}

//------------------------Move CSS and Update Array--------------------------------

function moveObject(typeOfObject, newPosX, newPosY, oldPosX, oldPosY)
{
    var oldObjectOfType = window.tileMap01.mapGrid[oldPosY][oldPosX];
    var newObjectOfType = window.tileMap01.mapGrid[newPosY][newPosX];

    var newElementID = "x"+newPosX+"y"+newPosY;
    var oldElementID = "x"+oldPosX+"y"+oldPosY;

    if (typeOfObject == 'P')
    {
        tileMap01.mapGrid[newPosY][newPosX] = 'P';
        
        $("#"+newElementID).removeClass();
        $("#"+newElementID).addClass("box");
        $("#"+newElementID).addClass("character");

        xposition = newPosX;
        yposition = newPosY;
    }
    else if (typeOfObject == 'B')
    {
        tileMap01.mapGrid[newPosY][newPosX] = 'B';
        
        $("#"+newElementID).removeClass();
        $("#"+newElementID).addClass("box");
        $("#"+newElementID).addClass("block");
    }

    var relValue = $("#"+oldElementID).attr('rel');
    if (relValue == 'goal')
    {
        $("#"+oldElementID).removeClass();
        $("#"+oldElementID).addClass("box");
        $("#"+oldElementID).addClass("goal");
    }
    else
    {
        $("#"+oldElementID).removeClass();
        $("#"+oldElementID).addClass("box");
        $("#"+oldElementID).addClass("space");
    }
}






