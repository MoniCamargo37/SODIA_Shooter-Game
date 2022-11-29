class Enemies {
  constructor() {
    let randomNumber = Math.random();
    if (randomNumber > 0.75) {
      this.x = Math.floor(Math.random() * 750);
      this.y = 0;
    } else if (randomNumber > 0.5) {
      this.x = 0;
      this.y = Math.floor(Math.random() * 750);
    } else if (randomNumber > 0.25) {
      this.x = Math.floor(Math.random() * 750);
      this.y = 750;
    } else {
      this.x = 750;
      this.y = Math.floor(Math.random() * 750);
    }
    this.role = null;
    this.image = new Image();
    this.invasionInterval = undefined;
    this.clearEnemy = false;
  }
    _enemiesInvasion() {
      this.invasionInterval = setInterval(() => {
        if (this.y === 350 || this.x === 350) {
          clearInterval(this.invasionInterval);
          this.clearEnemy = true;
        }
        this.x += this.incrementX;
        this.y += this.incrementY;
        }, 100);
    }
  _assignRole() {
    if (Math.floor(Math.random() * 3) > 1) { //if greater than 1 then apply the following characteristics 
      this.role = "Swordman1";
      this.widthEnemy = 150;
      this.heightEnemy = 150;
      this.speed = 3;
      this.live = 1;
      this.points = 10;
    } else { //If not, apply the characteristics listed below.
      this.role = "Swordman2";
      this.widthEnemy = 200;
      this.heightEnemy = 200;
      this.speed = 5;
      this.live = 2;
      this.points = 20;
    }
    this.incrementX = this.speed * (350 - this.x) / 100;
    this.incrementY = this.speed * (350 - this.y) / 100;
  }
  _assignImage() {
    if (this.role === "Swordman1") {
      this.image.src ='../img/EnemyDown.png';
    } else if (this.role === "Swordman2") {
      this.image.src ='../img/EnemyUp.png';
    }
  }
}
