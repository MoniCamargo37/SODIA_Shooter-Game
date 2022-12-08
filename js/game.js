const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let warrior;
class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.warrior = new Player(320, 320, 150, 150);
    this.enemy = [];
    this.bullets = [];
    this.points = 0;
    this.generateInterval = null;
    this.timerMovement = undefined;
    this.newBullet = {x: 0, y: 0, direction: '', active: true}; 
    this.showEnemySpeed = 800; //Se puede inicializar con cualquier valor para cada atributo porque los vamos a sobreescribir cada vez que se dispare
    this.dragonShowed = false; // false  porque el dragon no se ha mostrado todavía
    this.playing = true; // la añadimos a la función gameOver() y a  winTheGame() pero = false,  esto sirve para evitar que se junto las dos paginas en la pantalla.
  }

  _generateEnemies() {
    this.generateInterval = setInterval(() => {
      const newEnemy = new enemy();
      newEnemy._checkRandomNum();
      newEnemy._assignRole();
      newEnemy._assignImage();
      newEnemy._enemiesInvasion();
      this._accelerateGame();
      this.enemy.unshift(newEnemy);
      if ( this.points >= 300 && !this.dragonShowed) { // si llega a 500 points not dragon showed tenemos que crear una funcion para llamarlo
        const dragon = new enemy();
        dragon._showDragon(); // llamamos la funcion showDragon
        this.enemy.push(dragon); // push el dragon
        this.dragonShowed = true; 
      }
      
    },this.showEnemySpeed); 

}
_accelerateGame() { // this function speeds up the entry of enemies gradually. In this case -=10
  if(this.showEnemySpeed > 350){ //speeds up the entry of enemies gradually up to > 350
    this.showEnemySpeed -= 10; // each -= 10 the speed will change  
    clearInterval(this.generateInterval);
    this._generateEnemies();
  }
}
  _assignControls() {
    // keyboard control
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.warrior.turnLeft();
          //console.log('ArrowLeft');
          break;
        case 'ArrowRight':
          this.warrior.turnRight();
          break;
        case 'ArrowUp' :
          this.warrior.turnUp();
          // console.log('ArrowUp');
          break;
        case 'ArrowDown' :
          this.warrior.turnDown();
          break;
        case 'Space':
          this._shoot();
          break;
        default:
          break;
      }
    });
  }
 //done Wed / Thur 1st
  _checkCollisions() {
    const heroCenterX = 400;
    const heroCenterY = 400;
    this.enemy.every((theEnemy, indexEnemy) => {
      
      //Check collision with the bullets
      this.bullets.forEach((theBullet, indexBullet) => {
        if(theBullet.direction === theEnemy.entrance){ //Si la dirección del disparo y la entrada del enemigo coinciden, miramos la colisión. Si no, no hacemos nada.
          switch(theBullet.direction){
            case 'north':
              if(theBullet.y <= 0 )
                  this.bullets.splice(indexBullet, 1); // elimina los enemigos impactados
              else if(theBullet.y <= theEnemy.y + theEnemy.heightEnemy - 25){ //Es <= porque la bala está yendo hacia 0
                theEnemy.live--; // resta live del enemigo por cada impacto
                if(theEnemy.live === 0){
                  this.points += theEnemy.points; // suma los puntos antes de eliminar los enemigos
                  if(theEnemy.role === 'dragon'){
                    shotEffect = null;
                    gamePageSong.pause();
                    winPagesong.play();
                    this._winTheGame();
                  }
                  this.enemy.splice(indexEnemy, 1); // elimina los enemigos impactados
                }
                this.bullets.splice(indexBullet, 1);
              }
              break;
              case 'south':
                if(theBullet.y >= 800 )
                  this.bullets.splice(indexBullet, 1);
                else if(theBullet.y + 20 >= theEnemy.y + 25){ //Es >= porque la bala está yendo hacia 800
                  theEnemy.live--;
                  if(theEnemy.live === 0) {
                    this.points += theEnemy.points;
                    this.enemy.splice(indexEnemy, 1);
                  }
                  this.bullets.splice(indexBullet, 1);
                } 
                  break;
              case 'west':
                if(theBullet.x <= 0 )
                  this.bullets.splice(indexBullet, 1);
                else if(theBullet.x <= theEnemy.x + theEnemy.widthEnemy - 25){ //Es <= porque la bala está yendo hacia 0
                  theEnemy.live--; // resta la vida
                  if(theEnemy.live === 0) {
                    this.points += theEnemy.points;
                    this.enemy.splice(indexEnemy, 1);
                  }
                 
                  this.bullets.splice(indexBullet, 1);
                }
              break;
              case 'east':
                if(theBullet.x >= 800 )
                  this.bullets.splice(indexBullet, 1);
                else if(theBullet.x + 20 >= theEnemy.x + 25){ //Es <= porque la bala está yendo hacia 800
                  theEnemy.live--; // resta la vida
                  if(theEnemy.live === 0) {
                    this.points += theEnemy.points;
                    this.enemy.splice(indexEnemy, 1);
                  }
                  this.bullets.splice(indexBullet, 1);
                } 
              break;
            }
            }
          });
    
      const xDiff = 400 - (theEnemy.x + theEnemy.widthEnemy / 2); // calcular la diferencia entre los puntos centrales del enemigo y el jugador. calculo el ancho width entre 2 y se los sumo la posición X (esquina superior ezquierda)
      const yDiff = 400 - (theEnemy.y + theEnemy.heightEnemy / 2);
      let distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff ); //distancia entre los 2 puntos/teorema d epintagoras, calculo
      //el punto X Y indica la esquina superior izquierda de los dibujos, para calcular el centro del enemigo sumo
      //console.log("Distancia del enemigo: ", distance);
      if (distance < 100){ // calculo la distancia que quiero que el enemigo muera antes de llegar al player.
        if(this.playing){
          this._gameOver();
          return false;
        }
      }
      return true;
    });
  }

  //done on Tuesday 29th
  _drawWarriorGuard() {
    const warriorPosition = this.warrior.position;
    switch (warriorPosition) {
      case 'north':
        this.ctx.drawImage(warriorUp, this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height);
        break;
      case 'south':
        this.ctx.drawImage(warriorDown, this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height);
        break;
      case 'east':
        this.ctx.drawImage(warriorRight, this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height);

        break;
      case 'west':
        this.ctx.drawImage(warriorLeft, this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height);
        break;
        default:
          break;
    }
  }
//done on Tuesday 29th
  _drawEnemies() {
    this.enemy.forEach( enemy => {
        this.ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.widthEnemy, enemy.heightEnemy);
    });
  }
  //done Wed , Thur 1st
  _drawBullets() {
    this.bullets.forEach(bullet => {
      if(bullet.active === true){ // true : porque hay que mover la bala por la pantalla ( bala está juego)
        this.ctx.drawImage(myBulletImg, bullet.x-10, bullet.y-10, 20, 20);
        switch (bullet.direction) {
          case 'north':
            bullet.y -= 10;// resto 10 de y 
            if(bullet.y <= 0) bullet.active = false; // comprueba si la bala ha salido del limite superior de la pantalla Y.
            break;
          case 'south':
            bullet.y += 10;// añado 10 para y porque está mirando hacia abajo
            break;
          case 'east':
            bullet.x += 10; // añado 10 porque va a hacía a la derecha 
            break;
          case 'west':
            bullet.x -= 10; // resto 10 porque va hacía a la izquierda
            break;
//comprobar si la bala impacta el enemigo.
          }
        }
    });
  }
  //done Wed Thur 1st
  _shoot() {
    if (shotEffect === null) return;
    shotEffect.currentTime = 0;
    shotEffect.play();
    this.newBullet = {x: 0, y: 0, direction: this.warrior.position, active: true}; // paso position  x, y(posición  inicial de la bala) que luego serán modificadas ytb defino la dirección(que es la de warrior (N,S,W,E)
    switch (this.warrior.position) {
      //defino la posición inicial de la bala 
      case 'north': 
        this.newBullet.x = 400;
        this.newBullet.y = 350;
        break;
      case 'south':
        this.newBullet.x = 400;
        this.newBullet.y = 450;
        break;
      case 'west':
        this.newBullet.x = 350;
        this.newBullet.y = 400;
        break;
      case 'east':
        this.newBullet.x = 450;
        this.newBullet.y = 400;
        break;
      default:
        break;
    }
    // aqui la pongo en bullets con el push()
    this.bullets.push(this.newBullet);
    shotEffect.play();
  }

  // 
  _clean() {
    this.ctx.clearRect(0, 0, 800, 800);
  }
  
  //done Wed / Thur 1st
  _gameOver() {
    shotEffect = null;
    gamePageSong.pause();
    lostPagesong.play();
    clearInterval(this.generateInterval);
    const losePage = document.getElementById('lose-page');
     losePage.style = "display: flex";
     const canvas = document.getElementById('canvas'); 
     canvas.style = "display: none";
     this.playing = false; // para no salir junto con la pagina de win
    
   }
   
   _winTheGame() {
    clearInterval(this.generateInterval);
    const winPage = document.getElementById('win-page');
     winPage.style = "display: flex";
     const canvas = document.getElementById('canvas'); 
     canvas.style = "display: none";
     this.playing = false;
   }

   _writeScore() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgb(126, 95, 1)';
    this.ctx.fillStyle = 'rgb(126, 95, 1)';
    this.ctx.roundRect(550, 0, 300, 40, [0, 20]);
    this.ctx.fill();
    this.ctx.font = "30px Serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.points}`, 580, 25);
  }
  

  _update() {
    this._clean();
    this._writeScore();
    this._drawWarriorGuard();
    this._drawEnemies();
    this._drawBullets();
    this._checkCollisions();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    gamePageSong.play();
    this._assignControls();
    this._generateEnemies();
    this.timerMovement = setInterval(this._update(), 40);
  }

}
