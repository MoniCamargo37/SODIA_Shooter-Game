class enemy {
  constructor() {
    this.role = null;
    this.image = new Image();
    this.invasionInterval = undefined;
    this.clearEnemy = false;
    this.x = null;
    this.y = null;
    this.widthEnemy = null;
    this.heightEnemy = null;
    this.entrance = null;
    this.positionX = 0;
    this.velocity = 100;
    this.live = null;
  }

  _checkRandomNum() {
    // randomNumber es un número entre 0 y 1
    // para que haya un poco de variedad y no entren los enemigos en linea recta, se ha puesto un pequeño random * 100 para tener un número entre 0 y 100. A este número se le suma 300 siempre para que la esquina superior izquierda del enemigo empiece entre 300 y 400
    let randomNumber = Math.random();
    if (randomNumber > 0.75) {  //Si el número es mayor a 0.75 entrará por el norte
      this.x = 300 + Math.floor(Math.random() * 100);
      this.y = -200; // por esta dimesion saldrá los enemigos
      this.entrance = 'north'; // determinando la posición del enemigo
    } else if (randomNumber > 0.5) {  //Si el número es mayor a 0.5 entrará por el oeste
      this.x = -200; // por esta dimensaión saldrá los enemigos
      this.y = 300 + Math.floor(Math.random() * 100);
      this.entrance = 'west';
    } else if (randomNumber > 0.25) {  //Si el número es mayor a 0.25 entrará por el sur
      this.x = 300 + Math.floor(Math.random() * 100);
      this.y = 800;
      this.entrance = 'south';
    } else {  //Si no, entrará por el este
      this.x = 800;
      this.y = 300 + Math.floor(Math.random() * 100);
      this.entrance = 'east';
    }
  }
  _enemiesInvasion() {
    this.invasionInterval = setInterval(() => {
      if (this.y === 350 || this.x === 350) {
        clearInterval(this.invasionInterval); // aqui lo limpiamos porque si el enemigo te toca (gameover) y paramos el contador o el enemigo ni  ha llegado porque le has disparado antes.
        this.clearEnemy = true;
      }
      this.x += this.incrementX;
      this.y += this.incrementY;
    }, 100); // actualiza la X Y 
  }
  _assignRole() {
    if (Math.floor(Math.random() * 3) > 1) {
      //if greater than 1 then apply the following characteristics
      this.role = "Swordman1";
      this.widthEnemy = 150;
      this.heightEnemy = 150;
      this.speed = 2;
      this.live = 1;
      this.points = 10;
    } else {
      //If not, apply the characteristics listed below.
      this.role = "Swordman2";
      this.widthEnemy = 100;
      this.heightEnemy = 100;
      this.speed = 1;
      this.live = 2;
      this.points = 20;
    }
    this.incrementX = (this.speed * (350 - this.x)) / 100; //calcula el avance de la X Y  del enemigo para llegar a la posición del Heroe (centro del tablero).
    this.incrementY = (this.speed * (350 - this.y)) / 100;
  }
  
 _assignImage() {
    if (this.role === "Swordman1") {
      switch (this.entrance) { // llamamos a entrance porque es donde puse las direcciones/posiciones de los enemigos
        case 'north':
          this.image = enemyNorth1; 
          break;
        case 'south':
          this.image = enemySouth1;
          break;
        case 'east':
          this.image = enemyEast1;
          break;
        case 'west':
          this.image = enemyWest1;
          break;
          default:
            break;
      }
    } else if (this.role === "Swordman2") {

      switch (this.entrance) {
        case 'north':
          this.image = enemyNorth2;
          break;
        case 'south':
          this.image = enemySouth2;
          break;
        case 'east':
          this.image = enemyEast2;
          break;
        case 'west':
          this.image = enemyWest2;
          break;
          default:
            break;
      }
   
    }
  }
  _showDragon() {
    this.x =  200;
    this.y =  -400;
    this.widthEnemy = 400;
    this.heightEnemy = 400;
    this.entrance = 'north';
    this.speed = 2;
    this.live = 10;
    this.points = 100;
    this.image = enemyDragon;
    this.role = 'dragon';
    this.incrementX = 0;
    this.incrementY = 2;
    this._enemiesInvasion();
  }
}
