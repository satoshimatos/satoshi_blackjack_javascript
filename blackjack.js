var balanceSpace = document.getElementById("balance")
var cashoutSpace = document.getElementById("cashout")
var handSpace    = document.getElementById("hand") 
var currentSpace = document.getElementById("current")
var drawbtn      = document.getElementById("draw")
var restartbtn   = document.getElementById("restart")
var cashoutbtn   = document.getElementById("cashoutButton")
var betvalue     = document.getElementById("bet")
var balance      = 500
var bet          = 100
var cashout      = 0
var hand         = 0
var aces         = 0
var deck         = {
  'ace of diamonds'   : 11, 'ace of clubs'   : 11, 'ace of spades'   : 11, 'ace of hearts'    : 11,
  '2 of diamonds'     : 2,  '2 of clubs'     : 2,  '2 of spades'     : 2,  '2 of hearts'      : 2,
  '3 of diamonds'     : 3,  '3 of clubs'     : 3,  '3 of spades'     : 3,  '3 of hearts'      : 3,
  '4 of diamonds'     : 4,  '4 of clubs'     : 4,  '4 of spades'     : 4,  '4 of hearts'      : 4,
  '5 of diamonds'     : 5,  '5 of clubs'     : 5,  '5 of spades'     : 5,  '5 of hearts'      : 5,
  '6 of diamonds'     : 6,  '6 of clubs'     : 6,  '6 of spades'     : 6,  '6 of hearts'      : 6,
  '7 of diamonds'     : 7,  '7 of clubs'     : 7,  '7 of spades'     : 7,  '7 of hearts'      : 7,
  '8 of diamonds'     : 8,  '8 of clubs'     : 8,  '8 of spades'     : 8,  '8 of hearts'      : 8,
  '9 of diamonds'     : 9,  '9 of clubs'     : 9,  '9 of spades'     : 9,  '9 of hearts'      : 9,
  '10 of diamonds'    : 10, '10 of clubs'    : 10, '10 of spades'    : 10, '10 of hearts'     : 10,
  'jack of diamonds'  : 10, 'jack of clubs'  : 10, 'jack of spades'  : 10, 'jack of hearts'   : 10,
  'queen of diamonds' : 10, 'queen of clubs' : 10, 'queen of spades' : 10, 'queen of hearts'  : 10,
  'king of diamonds'  : 10, 'king of clubs'  : 10, 'king of spades'  : 10, 'king of hearts'   : 10
}

balanceSpace.innerHTML = '$' + balance + '.00'
cashoutSpace.innerHTML = '$' + cashout + '.00'

cashoutbtn.addEventListener("click", () => {
  cashoutGame()
})

restartbtn.addEventListener("click", () => {
  restart()
})

drawbtn.addEventListener("click", () => {
  drawCard()
})

function drawCard ()
{
  if (parseInt(betvalue.value) >= 100 && parseInt(betvalue.value) <= balance) {
    betvalue.disabled=true;
    bet = parseInt(betvalue.value)
    cashoutLoss()
    // gets index value of Object
    let deck2 = Object.keys(deck)
    // draws a random number between 0 and 51
    let card  = (Math.floor(Math.random()*(deck2.length)))
    // gets value from key
    let value = deck[deck2[card]]
    hand     += value
    // updates html page
    currentSpace.innerHTML = deck2[card]
      // removes drawn card from deck
    delete deck[deck2[card]]
    if (deck2[card] == "ace of spades" ||
        deck2[card] == "ace of hearts" ||
        deck2[card] == "ace of clubs" ||
        deck2[card] == "ace of diamonds")
      {
        aces += 1 
      }
      if (hand > 21) {
        hand -= aces*10
        aces --
      }
    handSpace.innerHTML    = hand
    console.log(deck2[card])
    console.log(aces)
    console.log(hand)
    if (hand > 17)
    {
      if (hand < 22) {
        cashoutbtn.style="visibility:visible;"
      }
      if (hand == 17)
      {
        cashoutSpace.style="color:rgb(255,80,0);"
        cashout = -bet/2
      } else if (hand == 18) {
        cashoutSpace.style="color:rgb(255,255,255);"
        cashout = 0
      } else if (hand == 19) {
        cashoutSpace.style="color:rgb(85,255,0);"
        cashout = bet/2
      } else if (hand == 20) {
        cashoutSpace.style="color:rgb(0,255,0);"
        cashout = bet
      } else if (hand == 21) {
        drawbtn.disabled=true
        cashoutSpace.style="color:rgb(255,255,0);"
        handSpace.style="color:rgb(0,255,0);"
        cashout = bet*5
      } else if (hand > 21)
      {
        loss()
      }
      if (cashout > 0) {
        cashoutSpace.innerHTML = '$+' + cashout + '.00'
      } else {
        cashoutSpace.innerHTML = '$' + cashout + '.00'
      }
    }
  } else {
    betvalue.disabled=false;
    alert('Bet must be between ' + '$100.00 and ' + '$' + balance + '.00!')
  }
}

function loss()
{
  cashoutSpace.style="color:rgb(255,255,255);"
  cashoutbtn.style="visibility:hidden;"
  cashoutLoss()
  handSpace.style="color:rgb(255,0,0);"
  drawbtn.disabled=true
  restartbtn.style="visibility:visible;"
}
function cashoutLoss()
{
  cashout = -bet
  cashoutSpace.style="color:rgb(255,100,0);"
  cashoutSpace.innerHTML = '$' + cashout + '.00'
}

function restart()
{
  // sets everything apart from Balance to zero
  // sets colors back to black
  // reenables draw button
  // resets deck
  betvalue.disabled=false;
  aces = 0
  balance += cashout
  balanceSpace.innerHTML = '$' + balance + '.00'
  hand = current = cashout = 0
  cashoutSpace.innerHTML = '$' + cashout + '.00'
  currentSpace.innerHTML = handSpace.innerHTML = "none"
  handSpace.style="color:rgb(255,255,255);"
  cashoutSpace.style="color:rgb(255,255,255);"
  drawbtn.disabled=false
  restartbtn.style="visibility:hidden;"
  cashoutbtn.style="visibility:hidden;"
  deck = {
    'ace of diamonds'   : 11, 'ace of clubs'   : 11, 'ace of spades'   : 11, 'ace of hearts'    : 11,
    '2 of diamonds'     : 2,  '2 of clubs'     : 2,  '2 of spades'     : 2,  '2 of hearts'      : 2,
    '3 of diamonds'     : 3,  '3 of clubs'     : 3,  '3 of spades'     : 3,  '3 of hearts'      : 3,
    '4 of diamonds'     : 4,  '4 of clubs'     : 4,  '4 of spades'     : 4,  '4 of hearts'      : 4,
    '5 of diamonds'     : 5,  '5 of clubs'     : 5,  '5 of spades'     : 5,  '5 of hearts'      : 5,
    '6 of diamonds'     : 6,  '6 of clubs'     : 6,  '6 of spades'     : 6,  '6 of hearts'      : 6,
    '7 of diamonds'     : 7,  '7 of clubs'     : 7,  '7 of spades'     : 7,  '7 of hearts'      : 7,
    '8 of diamonds'     : 8,  '8 of clubs'     : 8,  '8 of spades'     : 8,  '8 of hearts'      : 8,
    '9 of diamonds'     : 9,  '9 of clubs'     : 9,  '9 of spades'     : 9,  '9 of hearts'      : 9,
    '10 of diamonds'    : 10, '10 of clubs'    : 10, '10 of spades'    : 10, '10 of hearts'     : 10,
    'jack of diamonds'  : 10, 'jack of clubs'  : 10, 'jack of spades'  : 10, 'jack of hearts'   : 10,
    'queen of diamonds' : 10, 'queen of clubs' : 10, 'queen of spades' : 10, 'queen of hearts'  : 10,
    'king of diamonds'  : 10, 'king of clubs'  : 10, 'king of spades'  : 10, 'king of hearts'   : 10
  }
  if (balance < bet)
  {
    balanceSpace.style="color:rgb(200,0,0);"
    drawbtn.disabled=true
  }
}

function cashoutGame()
{
  balanceSpace.innerHTML = '$' + balance + '.00'
  restart()
}