//selecting all the required elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button")

// let idname;

window.onload = ()=>{//once window loaded
  for(let i = 0; i< allBox.length; i++){
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
  }
    selectXBtn.onclick = ()=>{
      selectBox.classList.add("hide");
      playBoard.classList.add("show");
    }
    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
      }

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

//user click function
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class = "${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign)
    }else{
       element.innerHTML = `<i class = "${playerXIcon}"></i>`;
        // playerSign = "O";
       element.setAttribute("id", playerSign);
       players.classList.add("active");
    }
         selectWinner();
         playBoard.style.pointerEvents = "none";
         element.style.pointerEvents = "none";
         let randomDelayTime = ((Math.random() *1000)+200).toFixed();
        // console.log(randomDelayTime);
         setTimeout(()=>{
            bot(runBot);
         }, randomDelayTime);
         }

//bot click function
function bot(runBot){
    let array = [];
   if(runBot){
    playerSign= "O";
     for(let i =0; i<allBox.length; i++){
        if(allBox[i].childElementCount == 0){
            array.push(i);
            //console.log(i);
                   }
               
    } 
    let randomBox = array[Math.floor(Math.random() * array.length)];
    // console.log(randomBox);
    if(array.length > 0)
    {
        if(players.classList.contains("player")){
            playerSign = "X";
            allBox[randomBox].innerHTML = `<i class = "${playerXIcon}"></i>`;
            allBox[randomBox].setAttribute("id", playerSign);
            players.classList.add("active");
        }else{
           allBox[randomBox].innerHTML = `<i class = "${playerOIcon}"></i>`;
           players.classList.remove("active");
           allBox[randomBox].setAttribute("id", playerSign);
        }
        selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
   }
  //  console.log(array);
}
function getClass(idname){
    
    return document.querySelector(".box" + idname).id;
}
 function checkClasses(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign ){
    return true;
 }
}
function selectWinner(){
          if(checkClasses(1, 2, 3, playerSign) || checkClasses(4, 5, 6,playerSign) || checkClasses(7, 8, 9, playerSign) || checkClasses(1, 5, 9, playerSign) || checkClasses(1, 4, 7, playerSign) || checkClasses(2, 5, 8, playerSign) || checkClasses(3, 6, 9, playerSign) || checkClasses(3, 5, 7, playerSign)){
           // console.log(playerSign +" "+"is the winner");
           runBot = false;
           bot(runBot);
           setTimeout(()=>{
              playBoard.classList.remove("show");
              resultBox.classList.add("show");
           },700);
           wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
        }
         else{
            if(getClass(1)!= "" && getClass(2)!= "" &&getClass(3)!= "" && getClass(4)!= "" && getClass(5)!= "" && getClass(6)!= "" && getClass(7)!= "" && getClass(8)!= "" && getClass(9)!= ""){
                runBot = false;
                bot(runBot);
                setTimeout(()=>{
                   playBoard.classList.remove("show");
                   resultBox.classList.add("show");
                },100);
                wonText.textContent = `Match has been drawn!`;
            }
        }
}replayBtn.onclick=()=>{
    window.location.reload();
}
