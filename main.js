var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var FPS = 60;
var cursor = {};
var isBuilding = false;
var tower = {};
var enemy = {
    x:64,
    y:480-32,
    direction:{x:0,y:-1},
    speed:64,
    pathDes: 0,
    move: function(){
        if( isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, this.speed/FPS, this.speed/FPS) ){

            // 首先，移動到下一個路徑點
            this.x = enemyPath[this.pathDes].x;
            this.y = enemyPath[this.pathDes].y;

            // 指定下一個路徑點
            this.pathDes++;

            // 取得前往下一個路徑點的單位向量
            var unitVector = getUnitVector( this.x, this.y, enemyPath[this.pathDes].x, enemyPath[this.pathDes].y );
            this.direction.x = unitVector.x;
            this.direction.y = unitVector.y;

        } else {
            // this.x += this.direction.x * this.speed/FPS;
            this.x = this.x + this.direction.x * this.speed/FPS;
            // this.y += this.direction.y * this.speed/FPS;
            this.y = this.y + this.direction.y * this.speed/FPS;
        }
    }
}

var enemyPath = [
    {x:64, y:352},
    {x:192, y:352},
    {x:192, y:384},
    {x:224, y:384},
    {x:224, y:416},
    {x:228, y:416},
    {x:228, y:224},
    {x:96, y:224},
    {x:96, y:64},
    {x:544, y:64},
    {x:544, y:244},
    {x:416, y:224},
    {x:416, y:352},
    {x:576, y:352}
];

// ====== 引入圖檔 ====== //
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var buttonImg = document.createElement("img");
buttonImg.src = "images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var slimeImg = document.createElement("img");
slimeImg.src = "images/slime.gif";
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
    } else if (isBuilding) {
        tower.x = cursor.x - cursor.x%32;
        tower.y = cursor.y - cursor.y%32;
    }
});

function draw(){

    enemy.move();

    ctx.drawImage(bgImg,0,0);
    ctx.drawImage(buttonImg, 640-64, 480-64, 64, 64);
    ctx.drawImage(towerImg, tower.x, tower.y);
    ctx.drawImage(slimeImg, enemy.x, enemy.y);
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

function getUnitVector(srcX, srcY, targetX, targetY) {
    var offsetX = targetX - srcX;
    var offsetY = targetY - srcY;
    var distance = Math.sqrt( Math.pow(offsetX,2) + Math.pow(offsetY,2) );

    var unitVector = {
        x: offsetX/distance,
        y: offsetY/distance
    };
    return unitVector;
}
