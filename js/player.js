const canvas = document.querySelector('#canvas');
let width = this.warrior.width;
let height =  this.warrior.height;

class Player {
  constructor(x, y, width, height) {
    this.image = warrior;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.centerX = center.x;
    centerY = center.y
    //this.direction = 'y = 400', 'X = 400', 'y = - 400', 'X = - 400'
  }

  turnRight() {
    this.image.rotate(45 * Math.PI / 180);
  }
  turnLeft() {
    this.x = this.x - 15;
    if (this.x + this.width < 0) {
      this.x = 800;
    }
  }
  turnUP() {
    this.y = this.y + 15;
    if (this.y > 800) {
      this.y = 0 - this.height;
    }
  }

turnDown() {
    this.x = this.y - 15;
    if (this.y + this.width < 0) {
      this.y = 800;
    }
  }

}
