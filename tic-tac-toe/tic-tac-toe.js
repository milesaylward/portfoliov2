$(function(){

  var player;
  var computer;
  var currPlayer;

  var turns = ['#', '#', '#', '#', '#', '#', '#', '#', '#'];

  var computerTurn = false;
  var gameOn = true;
  var count = 0;

  var turn;

  function gameStart() {
    $(".choice").click(function() {
      if (this.id == "X") {
        player = "X";
        computer = "O";
        turn = player;
        $(".game-start").fadeOut(2000);
        setTimeout(drawBoard, 2001);
      } else {
        player = "O";
        computer = "X";
        turn = player;
        $(".game-start").fadeOut(2000);
        setTimeout(drawBoard, 2001);
      }
    });
  }

  function drawBoard() {
    $(".button-container").animate({
      'opacity': '1'
    }, 1000);
    $('.button-container').css('display', 'block');
  }

  function showWinner(currPlayer) {
    $(".winner").hide().html("<h2>Player " + currPlayer + " is the winner!</h2>").fadeIn('slow');
  }

  function compTurn() {
    var taken = false;
    while (taken === false) {
      var computerMove = (Math.random() * 8).toFixed();
      var move = $("#" + computerMove).text();
      if (move === "") {
        taken = true;
        console.log(move);
        $("#" + computerMove).text(computer);
        turns[computerMove] = computer;
        console.log(turns);
      }
    }
  }

  function playerTurn(turn, id) {
    var spaceTaken = $("#" + id).text();
    if (spaceTaken === "") {
      count++
      turns[id] = turn;
      $("#" + id).text(turn);
      currPlayer = player;
      win(turns, currPlayer);
      if (gameOn === true) {
        currPlayer = computer;
        setTimeout(compTurn, 1000);
        win(turns, currPlayer);
      }
    }
  }

  $('.game-buttons').click(function() {
    var space = $(this).attr("id");
    playerTurn(turn, space);
  });

  function win(turns, turn) {
    if (turns[0] === currPlayer && turns[1] === currPlayer && turns[2] === currPlayer) {
      gameOn = false;
      showWinner(currPlayer);
      setTimeout(reset, 3000);
    } else if (turns[0] === currPlayer && turns[4] === currPlayer && turns[8] === currPlayer) {
      gameOn = false;
      showWinner(currPlayer);
      setTimeout(reset, 3000);
    } else if (turns[0] === currPlayer && turns[3] === currPlayer && turns[6] === currPlayer) {
      gameOn = false;
      showWinner(currPlayer);
      setTimeout(reset, 3000);
    } else if (turns[1] === currPlayer && turns[4] === currPlayer && turns[7] === currPlayer) {
      gameOn = false;
      showWinner(currPlayer);
      setTimeout(reset, 3000);
    } else if (turns[2] === currPlayer && turns[5] === currPlayer && turns[8] === currPlayer) {
      gameOn = false;
      showWinner(currPlayer);
      setTimeout(reset, 3000);
    } else if (turns[3] === currPlayer && turns[4] === currPlayer && turns[5] === currPlayer) {
      gameOn = false;
      showWinner(currPlayer);
      setTimeout(reset, 3000);
    } else if (turns[2] === currPlayer && turns[4] === currPlayer && turns[6] === currPlayer) {
      gameOn = false;
      showWinner(currPlayer);
      setTimeout(reset, 3000);
    } else if (turns[6] === currPlayer && turns[7] === currPlayer && turns[8] === currPlayer) {
      gameOn = false;
      showWinner(currPlayer);
      setTimeout(reset, 3000);
    } else if (count === 5) {
      gameOn = false;
      $('.winner').hide().html("<h2>It was a draw!</h2>").fadeIn('slow');
      setTimeout(reset, 3000);
    } else {
      gameOn = true;
    }
  }

  function reset() {
    $('.game-buttons').text('');
    count = 0;
    turns = ['#', '#', '#',
      '#', '#', '#',
      '#', '#', '#'
    ];
    player = '';
    computer = '';
    $('.button-container').fadeOut(1000, function() {
      $('.winner').fadeOut();
      $('.winner').html("");
      $('.game-start').fadeIn();
    });
    gameStart();
  }

  $('#reset').click(function() {
    reset();
  });

  gameStart();
});
