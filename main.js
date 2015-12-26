Skip to content
This repository
Search
Pull requests
Issues
Gist
 @Bryan1203
 Watch 1
  Star 0
  Fork 0 OrangeAppleTW/JS-Tower-Defense
 Code  Issues 0  Pull requests 0  Wiki  Pulse  Graphs
Branch: gh-pages Find file Copy pathJS-Tower-Defense/v2/main.js
84eaf78  21 minutes ago
@kevin-shu kevin-shu c
1 contributor
RawBlameHistory     58 lines (48 sloc)  1.32 KB
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var FPS = 60;
var cursor = {};
var isBuilding = false;

// ====== 引入圖檔 ====== //
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var buttonImg = document.createElement("img");
buttonImg.src = "images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
// ==================== //

$("#game-canvas").mousemove(function(event) {
    cursor = {
        x: event.offsetX,
        y: event.offsetY
    };
});

$("#game-canvas").click(function(){
    if( isCollided(cursor.x, cursor.y, 640-64, 480-64, 64, 64) ){
        if (isBuilding) {
            isBuilding = false;
        } else {
            isBuilding = true;
        }
    }
});

function draw(){
    ctx.drawImage(bgImg,0,0);
    ctx.drawImage(buttonImg, 640-64, 480-64, 64, 64);
    if(isBuilding){
        ctx.drawImage(towerImg, cursor.x, cursor.y);
    }
}

setInterval(draw, 1000/FPS);



// ====== 其他函式 ====== //

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
    if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
    ){
        return true;
    } else {
        return false;
    }
}
Status API Training Shop Blog About Pricing
© 2015 GitHub, Inc. Terms Privacy Security Contact Help
