const randomNumDisplay = document.querySelector('.randomNumDisplay')

function randomNum() {
    //let us create a full array of the numbers that are required
    let shuffled_array = [1, 2, 3, 4, 5]

    //algo to shuffle the array
    shuffled_array.sort(() => Math.random() - 0.5);


    let randomNumber = shuffled_array.pop()
        //display random number
    randomNumDisplay.textContent = `Position rolled : ${randomNumber}`

    //since it is a shuffled array, this would be the randomised number
    return randomNumber;
}
let turns=0;
let playerName = document.querySelector(".player_name");
let playerNum = 2
let player1=[0,0,0,0,0];
let player2=[0,0,0,0,0];
let points=[0,0]

//when the turn of player occurs


let turnButton = document.querySelector('.turnButton')
turnButton.addEventListener('click',()=>{
  if(turns==0){
    gameReset();
  }else{
    if (playerNum == 1) {
        playerNum = 2
    } else {
        playerNum = 1
      }
      playerTurn(playerNum);
  }
})

function gameReset() {
  //reset the turns
  turns=0
  //reset the points
  player1=[0,0,0,0,0]
  player2=[0,0,0,0,0]
  points=[0,0]
  checkPoints(1)

  //reset the board
  let elements= document.querySelectorAll(".container>*")
  elements.forEach((element)=>{
    if(element.classList.contains('player1')||element.classList.contains('player2')){
      for(let i=1; i<14; i++){
      element.firstElementChild.children[i].style.visibility="hidden"
    }
    }

  })

  let a=' '
  while(a!='h' && a!='t'){
    a= prompt('Player1 : Choose heads or tails (h/t)')
}
  let random = ['h','t']
  random.sort(() => Math.random() - 0.5)
  if (a==random.pop()) {
    alert('Player 1 will play first')
    playerTurn(1)
  }
  else {
    alert('Player 2 will play first')
    playerTurn(2)
  }



  turnButton.textContent="Play!"




  let pointstable = document.querySelector(".points")
  pointstable.style.display="inline-block"

  let container = document.querySelector(".container")
  container.style.display="grid"

  let leaderboard = document.querySelector(".leaderboard")
  leaderboard.style.display="none"

}





let pts1 = document.querySelector('.player1points');
let pts2 = document.querySelector('.player2points');


function checkPoints(playerNum) {
  for(let i=0;i<5;i++){
    if(player1[i]>=5 && playerNum==2){
      points[0]+=1

      pts1.textContent=`Player 1 points : ${points[0]}`
    }
    if(player2[i]>=5 && playerNum==1){
      points[1]+=1
      pts2.textContent=`Player 2 points : ${points[1]}`
    }
  }

}



//the attributes of a player
function playerTurn(playerNum) {


  if(playerNum==1){
    playerPts = player1;
  }else{
    playerPts = player2;
  }

  //start of players turn
    playerName.textContent = `Player${playerNum}'s turn`



  //middle of players playerTurn
  const playerVal=randomNum();

  const gridElements = document.querySelectorAll(`.player${playerNum}`)

  gridElements.forEach((element)=>{
    if(element.classList.contains(`${playerVal}`)){


      //random chance to get the superpower
      array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
      array.sort(() => Math.random() - 0.5);
      if(array.pop()==1){
        if(element.classList.contains('protect')==false){
          element.style.backgroundColor='yellow'
          element.classList.add('protect')
      }
      }




      playerPts[playerVal-1]+=1;
      turns+=1;

      if(playerPts[playerVal-1]>=9){
        let a = ''
        a = prompt("Do you want to kill one of the opponent's humans? (y/n)")


        if(a=='y'){
          let p=playerPts[playerVal-1]
          element.firstElementChild.children[p-1].style.visibility="hidden"
          element.firstElementChild.children[p].style.visibility="hidden"
          playerPts[playerVal-1]-=2;

          playerKill(playerNum);

        }

    }

    if(playerPts[playerVal-1]<=13){
    element.firstElementChild.children[playerPts[playerVal-1]].style.visibility="visible"
  }

    }
  })



  //end of playerTurn



    checkPoints(playerNum)
    turnEnd(playerNum);
}

function turnEnd(playerNum) {
  //have a condition that would end the game

    if(turns==75){
      if(points[0]>points[1]){
        alert(`Game ends! Player 1 won with ${points[0]}`)
        let a = prompt("Do you want to put your score in leaderboard?(y/n)")
        if(a=='y'){
          let name= prompt('Enter your name!')
          saveHighScore(name,points[0]);
        }
      }
      else if(points[1]>points[0]){
        alert(`Game ends! Player 2 won with ${points[1]}`)
        let a = prompt("Do you want to put your score in leaderboard?(y/n)")
        if(a=='y'){
          let name= prompt('Enter your name!')
          saveHighScore(name,points[1]);
        }
      }
      if(points[0]==points[1]){
        alert(`Game ends! TIE with ${points[0]}`)
      }

      gameEnd();

    }

}

function gameEnd() {
  let pointstable = document.querySelector(".points")
  pointstable.style.display="none"

  let container = document.querySelector(".container")
  container.style.display="none"

  let leaderboard = document.querySelector(".leaderboard")
  leaderboard.style.display="grid"

  playerName.textContent=''
  randomNumDisplay.textContent=''

  turns=0;

  turnButton.textContent="Start Game!"

}

function playerKill(playerNum) {
  let b=0
  b=prompt("Which position of human do you want to kill?")

  let opponentNum=0;
  if(playerNum==1){
    opponentNum=2;
    player2[b-1]=0
  }
  if(playerNum==2){
    opponentNum=1;
    player1[b-1]=0;
  }
  if(b in [1,2,3,4,5]){


    const opponentElements=document.querySelectorAll(`.container>.player${opponentNum}`)
    opponentElements.forEach((element)=>{
    if(element.classList.contains(`${b}`)){
      if(element.classList.contains('protect')){
        element.classList.remove('protect')
        element.style.backgroundColor='#256D85'
      }else{
        for(let i=1; i<14; i++){
          element.firstElementChild.children[i].style.visibility="hidden"
        }
      }
    }
  })
}


}







//leaderBoard saving functions things
localStorage.setItem("highScores", JSON.stringify([]));

//list of the highscores saved in local storage
const highScores = JSON.parse(localStorage.getItem("highScores"));



function saveHighScore(name,score) {

    //save as a dictionary for the highscores
    const scores_dict = {
        score_val: score,
        name: name
    }
    highScores.push(scores_dict);

    sortHighScore();
    saveLeaderboard();
}


//sorts the highscore
function sortHighScore() {
    let size = highScores.length
        //bubble sort
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (highScores[j].score_val < highScores[i].score_val) {
                let temp = highScores[i]
                highScores[i] = highScores[j]
                highScores[j] = temp
            }
        }
    }

    let highscoreVal = document.querySelector('.Highscore_Val')
    highscoreVal.textContent = `Highscore = ${highScores[0].score_val}`


    while(highScores.length>5){
      highScores.pop();
    }
}


function saveLeaderboard() {
  let leaderboard_stats = document.querySelectorAll('.leaderboard_stats')
  leaderboard_stats.forEach((leaderboard_score)=>{
    for(let i=0; i<highScores.length; i++){
      if(leaderboard_score.classList.contains(`${i}`)){
        leaderboard_score.textContent = `${highScores[i].name} - ${highScores[i].score_val}`
      }
    }
  })
}
