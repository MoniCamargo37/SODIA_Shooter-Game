class Player {
  constructor(x, y, width, height) {
    this.image = warrior;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.position = 'south';
  }

  turnRight() {
    // this.x = this.x + 15;
    // if (this.x + this.width > 800) {
    //   this.x = 0;
    
    this.position = 'east';
  }
  turnLeft() {
    // this.x = this.x - 15;
    // if (this.x + this.width < 0) {
    //   this.x = 800;
    
    this.position = 'west'
  }
  turnUp() {
    // this.y = this.y - 15;
    // if (this.y + this.height < 0) {
    //   this.y = 800;
    // }
    this.position = 'north'
  }

turnDown() {
    // this.y = this.y + 15;
    // if (this.y > 800) {
    //   this.y = 0 - this.height;
    // }
    this.position = 'south'
  }

}
