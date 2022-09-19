let initialTime = 180;
let restTime = 60;

function returnFormattedTime(time) {
  return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

const displayWork = document.querySelector(".work-display-time")
const displayPause = document.querySelector(".pause-display-time")

displayWork.textContent = returnFormattedTime(initialTime)
displayPause.textContent = returnFormattedTime(restTime)

const startPauseBtn = document.querySelector(".start-btn");
startPauseBtn.addEventListener("click", togglePomodoro)

let currentInterval = false;
let timerID;
function togglePomodoro(){
  handlePlayPause()

  if(currentInterval) return;
  currentInterval = true;

  initialTime--;
  displayWork.textContent = returnFormattedTime(initialTime)
  handleClassAnimation({work: true, rest: false})

  timerID = setInterval(handleTicks, 1000)
}

let pause = true;
function handlePlayPause(){
  if(startPauseBtn.firstElementChild.src.includes("play")) {
    startPauseBtn.firstElementChild.src = "ressources/pause.svg"
    pause = false;
  }
  else {
    startPauseBtn.firstElementChild.src = "ressources/play.svg"
    pause = true;
  }
}

function handleClassAnimation(itemState){
  for(const item in itemState) {
    if(itemState[item]){
      document.querySelector(`.${item}`).classList.add("active")
    }
    else {
      document.querySelector(`.${item}`).classList.remove("active")
    }
  }
}

const cycles = document.querySelector(".cycles")
let cyclesNumber = 0;

function handleTicks(){

  if(!pause && initialTime > 0){
    initialTime--;
    displayWork.textContent = returnFormattedTime(initialTime)
    handleClassAnimation({work: true, rest: false})
  }
  else if(!pause && initialTime === 0 && restTime > 0) {
    restTime--;
    displayPause.textContent = returnFormattedTime(restTime)
    handleClassAnimation({work: false, rest: true})
  }
  else if(pause && initialTime > 0 || restTime > 0) {
    initialTime;
    restTime;
    displayWork.textContent = returnFormattedTime(initialTime)
    displayPause.textContent = returnFormattedTime(restTime)
  }
  else {
    initialTime;
    restTime;
    displayWork.textContent = returnFormattedTime(initialTime)
    displayPause.textContent = returnFormattedTime(restTime)
    handleClassAnimation({work: false, rest: false})
    startPauseBtn.firstElementChild.src = "ressources/play.svg"
    reset()
    cyclesNumber++;
    cycles.textContent = `Cycle(s) : ${cyclesNumber}`
  }

}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset)

function reset(){
  initialTime = 180;
  restTime = 60;
  displayWork.textContent = returnFormattedTime(initialTime)
  displayPause.textContent = returnFormattedTime(restTime)

  handleClassAnimation({work: false, rest: false})
  startPauseBtn.firstElementChild.src = "ressources/play.svg"
  cycles.textContent = `Cycle(s) : ${cyclesNumber}`

  clearInterval(timerID);
  currentInterval = false;
}