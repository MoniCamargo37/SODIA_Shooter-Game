window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const startPage = document.getElementById('start-page');
  const startButton = document.getElementById('start');
  const winPage = document.getElementById('win-page');
  const tryWinButton = document.getElementById('tryWinButton');
  const losePage = document.getElementById('lose-page');
  const tryLoseButton = document.getElementById('tryLoseButton');
  startPagesong.play();
  
  startButton.onclick = function () {
    startPage.style = "display: none";
    canvas.classList.remove('hidden');
    const game = new Game(ctx);
    game.start();
  }

  tryWinButton.onclick = function () {
    window.location.reload(); 
  }
  tryLoseButton.onclick = function () {
    window.location.reload();  
  }
}


  // returnStartButtonWin.onclick = function () {
  //   window.location.reload();
  // };

//un ejemplo de boton que al acabar reinicia el juego


