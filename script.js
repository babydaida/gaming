window.addEventListener("load", function(){


    // intilialise width and height 

    const WIDTH = 640;
    const HEIGHT = 360;

    // MAKING GAME LIVE
    var gameLive = true;

   // instialise level
     var level = 1;
     var life = 5;
     var color = "#"+((1<<24)*Math.random()|0).toString(16);

     //enemins
     var enemies = [
         {
           x:100, //x cooridinate
           y:100, // y cooridinate
           speedY: 2,
           w:40, // width of enemy
           h:40, // height of enemy
         },
         {
             x:200,
             y:0,
             speedY:2,
             w:40,
             h:40,
         },
         {
            x:350,
            y:100,
            speedY:3,
            w:40,
            h:40,  
         },
         {
            x:450,
            y:100,
            speedY:-3,
            w:40,
            h:40,    
        },

     ];

     //player
      var player = {
          x:10,
          y:160,
          speedX: 2,
          w:40,
          h:40,
          isMoving:false,
          
      }

      var goal={
        x:500,
        y:160,
        w:50,
        h:36,
        

      }

      var sprites = {};

      var movePlayer = function() {
          player.isMoving = true;
      }

      var stopPlayer = function() {
          player.isMoving = false;
      }

      //selecting the canvas

      var canvas = document.getElementById("mycanvas");
      var ctx = canvas.getContext("2d"); 

      //adding events listener

      canvas.addEventListener("mousedown",movePlayer);
      canvas.addEventListener("mouseup", stopPlayer);
      canvas.addEventListener("touchstart",movePlayer);
      canvas.addEventListener("touchend", stopPlayer);

      //update the logic

      var update = function() {
          //check if player is won
          if(checkCollision(player,goal)) {

              alert('Win!!');
              level +=1;
              life +=1;
              player.speedX += 1;
              player.x = 10;
              player.y = 160;
              player.isMoving = false;


              //loop
              for(var ab = 0; ab < enemies.length; ab++){
                  if (enemies[ab].speedY > 1){
                      enemies[ab].speedY += 1;  //increasing

                  }

                  else{
                      enemies[ab].speedY -= 1; //decreasing
                  }

              }
          }
            //update  player
            if(player.isMoving){
                player.x = player.x + player.speedX;
            }
            //update enemies
            var i = 0;
            var n = enemies.length;

            enemies.forEach(function(element, index){

                //checking collision with players
                if (checkCollision(player , element)){

                //stop the game

                if(life === 0){
                    alert('Game over!!!')
                    //loop

                    for( var ab=0 ; ab < enemies.length ; ab++){
                        if(enemies[ab].speedY > 1){
                            enemies[ab].speedY -=(level-1);
                        }
                        else{
                            enemies[ab].speedY +=(level-1);
                        }
                    }
                    level = 1;
                    life = 6;
                    player.speedX = 2;
                    color = "#"+((1<<24)*this.Match.random()|0).toString(16);

                }
                if(life > 0){
                    life -=1;
                    color = "#"+((1<<24)*Math.random()|0).toString(16);

                }
                player.x = 10;
                player.y = 160;
                player.isMoving = false;


                }
                //move enemy
                element.y += element.speedY;

                //check borders
                if(element.y <= 10){
                    element.y = 10;
                    element.speedY *= -1;
                }
                else if(element.y >= HEIGHT -50) {
                    element.y = HEIGHT - 50;
                    element.speedY *= -1;
                }

            });

      };
      //draw the elements

      var draw = function(){
          // clear the convas
          ctx.clearRect(0,0,WIDTH,HEIGHT);

          //draw
          ctx.font = '15px Verdana';
          ctx.fillStyle = 'rgb(0,0,0)';
          ctx.fillText("level : " + level , 10 , 15);
          ctx.fillText("life : " + life , 10 , 35);
          ctx.fillText("speed : " + player.speedX , 10 , 55);

          //draw player with random color
          ctx.fillStyle = color,
          ctx.fillRect(player.x , player.y , player.w , player.h);

          //draw enemies
          ctx.fillStyle = "rgb(0,12,43)";
          enemies.forEach(function(element,index){
              ctx.fillRect(element.x , element.y , element.w, element.h);

          });
          //draw goal
          ctx.fillStyle = "rgb(0,225,120)";
          ctx.fillRect(goal.x , goal.y , goal.w , goal.h);
          ctx.fillStyle = "rgb(0,0,0)";
          ctx.fillText("Goal", goal.x + 7 , goal.y + 25);

      };

            //step function ---executed with multiple time per second
            var step = function(){
                update();
                draw();
      
                if(gameLive){
                    window.requestAnimationFrame(step);
                }
            };

        var checkCollision = function(rect1,rect2){

            var closeOneWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w , rect2.w);
            var closeOneHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h , rect2.h);

            return closeOneWidth && closeOneHeight
        }

      step();
});
