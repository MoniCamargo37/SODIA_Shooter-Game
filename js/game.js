const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let warrior;

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.warrior = new Player(350,320,150,150);
    this.enemies = [];
    this.points = 0;
    this.generateInterval = null;
  }

  _generateEnemies() {
    this.generateInterval = setInterval(() => {
      const newEnemy = new Enemies();
      newEnemy._assignRole();
      newEnemy._assignImage();
      newEnemy._enemiesInvasion();
      this.enemies.push(newEnemy);
      
    },1000); 
}
  _assignControls() {
    // Controles del teclado
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.warrior.turnLeft();
          break;
        case 'ArrowRight':
          this.warrior.turnRight();
          break;
        case 'ArrowUP' :
          this.warrior.turnUp();
          break;
        case 'ArrowDown' :
          this.warrior.turnDown();
          break;
        default:
          break;
      }
    });
  }
  _checkCollisions() {
    // let enemy = undefined;
    // this.enemies.forEach((enemy) => {
    //   if (this.enemies === this.warrior.x, this.warrior.y) {
      
    //   }
    // });

  }

  _drawWarriorGuard() {
    const warriorGuardImg = new Image();
    warriorGuardImg.src= './img/hero_.png';
    this.ctx.drawImage(warriorGuardImg, this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height)
}

  
  _drawEnemies() {
    this.enemies.forEach( enemy => {
      if(enemy.clearEnemy === false)
        this.ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.widthEnemy, enemy.heightEnemy);
    });
  }
 
  _gameOver() {
   clearInterval(this.generateInterval);
     const losePage = document.getElementById('lose-page');
    losePage.style = "display: flex";
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none";
  }

  // _writeScore() {
  //   this.ctx.fillStyle = "white";
  //   this.ctx.font = "20px Arial";
  //   this.ctx.filterText(`Points: ${this.points}`,750,600);
  // }

  _update() {
    ctx.clearRect(0, 0, 800, 800);
    this._drawWarriorGuard();
    this._drawEnemies();
    //this.gameOver();
    this._checkCollisions();
    //this._writeScore();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._generateEnemies();
    setTimeout(() => {
      setInterval(this._update(), 40);
     }, 100);       
  }

}
