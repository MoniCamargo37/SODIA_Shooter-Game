# Game name
<img src="./img/screenshotGame.jpg">

## Description

Game's purpose and description:

In a time of blood and fire, the kingdom of Sodia is about to be overrun by the worst kind of enemies. 

Are you ready to save the kingdom?

instructions below:

* You have to defend the kingdom by shooting the enemies.
* If the enemies reach the base, you die. 
* When you kill an enemy, you earn 10 or 20 points, depending on the type of enemy killed.
* If you get 500 points you will have the mission to kill the beast  called Big Dragon, apart from killing the enemies at the same time.

## User stories MVP

Minimum user stories:

* Use LEFT / RIGHT / UP / DOWN arrows to move the player, so turns around (north, south, west, east)  and click space to shoot.
* user can see a start screen with instructions and an end screen when user wins / loses.
* Enemies have differences in terms of their "value : Some enemies give the user  10 points, others 20 points, and the last one (the dragon) will give 500 points. 
* Press START button to start the game.
* Enemies appear from north, south, east and west.
* User shoots to the 4 directions.
* if BabyDragon is killed user wins.
* if enemies touch the user´s base, user loses

## User stories Backlog
  Bonus:
* can get others weapons (arrows, stones, etc.) or only one weapon. 
* more than 1 Dragon enemy in the borad, at least 1 per direction
* Limit the number of bullets and if the user runs out of bullets the user dies.
* The player can move around the board in different directions.



## File structure

- <code>game.js</code>: contains all the elements for the game to work. Methods: start(), \_update()
- <code>scripts.js</code>: contains all the DOM manipulation code to start the game.
- <code>player.js</code>: contains the class player.
- <code>enemy.js</code>: contains the class enemy
- <code>assets.js</code>: contains all the images and audios 
- <code>styles.css</code>:
- <code>index.html</code>: contains the contents of the lose/win/start page.


## Useful links

<!-- When you finish, add these links and commit -->

- [Presentation slides]()
- [Deployed game]()
