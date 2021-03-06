let dice = [{},{},{},{},{}]
let score = 0
let diceCounts = {}
let remainingRolls = 3

// die structure
// face: #
// img: dieface-# (# is face)
// hold: boolean


//  INITIALIZING STUFF //


function clearPointboxes(){
    let rows = Array.from(scorecard.firstElementChild.children)
    rows.forEach(row => {
        if(row.classList[0] === "section"){
            null
        } else {
            row.children[1].innerText=""
        }
    })
}

function revertDiceColorSelectToNone(){
    let diceColorSelect = document.getElementById("dice-color")
    diceColorSelect.value = "none"
}

function dicePresent(){
    let dieslotRow = document.getElementById("dieslot-row")
    let dicePresent = dieslotRow.firstElementChild.innerHTML
    return dicePresent
}

function clearOldDice(){
    // check if dice already present (prev game started)
    // If so, clear them out. If not, don't need to do anything
    let dieslotRow = document.getElementById("dieslot-row")
    if(dicePresent()){
        let dieslots = Array.from(dieslotRow.children)
        dieslots.forEach(dieslot => dieslot.removeChild(dieslot.firstChild))
    } else {
        null
    }
}

function addRollButton(){
    let rollButtonExists = document.getElementById("roll")
    if(rollButtonExists){
        return null
    } else {
        let rollButton = document.createElement("button")
        let playArea = document.getElementById("play-area")
        rollButton.id="roll"
        rollButton.innerText="Roll"
        // Need to work this out
        rollButton.addEventListener("click", (e,[]) => {rollHandler})
        playArea.appendChild(rollButton)
    }
}
// Can probs delete this:
// function removeRollButton(){
//     let rollButton = document.getElementById("roll")
//     if(rollButton){
//         rollButton.parentElement.removeChild(rollButton)
//     } else {
//         null
//     }
// }

function revealDiceColorForm(){
    let dcf = document.getElementById("dice-color-form")
    if(dcf.style.visibility === "visible"){
        return null
    } else {
        dcf.style.visibility = "visible"
    }
}

function initializeDice(){
    // clear old dice from previous game
    clearOldDice();
    // Performs first roll and appends dice imgs to dice-area
    // The first roll can probably be done by a reworked roll() fxn
    let i = 0
    while(i<5){
        let randomNum = Math.ceil(Math.random()*6)
        dice[i]["face"] = randomNum
        dice[i]["img"] = "images/dieface-" + randomNum +".png"
        i++
    }
    let diceHolder = document.getElementById("dice-holder")
    let firstDiceHolderRow = Array.from(diceHolder.firstElementChild.firstElementChild.children)
    dice.forEach((die,index) => {
        let dieEle = document.createElement("img")
        dieEle.src = die["img"]
        dieEle.alt = die["face"]
        dieEle.classList.add("die")
        dieEle.addEventListener("click", holdClickHandler)
        firstDiceHolderRow[index].appendChild(dieEle)
    })
}



function initialize(){
    let start = document.getElementById("start")
    start.addEventListener("click", confirmNewGame)
    let colorSelector = document.getElementById("dice-color")
    colorSelector.addEventListener("change", (e) =>{diceColorChange(e)})
}

function confirmNewGame(){
    if(dicePresent()){
        let proceed = confirm("This will start a new game and the current game's progress will be lost. Continue?")
        if(proceed){
            gameStart()
        }
    } else {
        gameStart()
    }
}

function gameStart(){
    clearPointboxes();
    revealDiceColorForm();
    revertDiceColorSelectToNone();
    addRollButton();
    // empty dice holder???
    // ???
    // roll();
    initializeDice();
}

function diceColorChange(event){
    let dice = Array.from(document.getElementsByClassName("die"))
    let value = event.target.value
    dice.forEach(die => {
        if(value.endsWith(")") ){
            die.style=`background-image:${value}`
        } else {
            die.style=`background:${value}`
        }
    })
}
// function addRollButton(){
//     let rollButton = document.createElement("button")
//     let playArea = document.getElementById("play-area")
//     rollButton.innerText="Roll"
//     // Need to work this out
//     rollButton.addEventListener("click", (e,[]) => {rollHandler})
//     playArea.appendChild(rollButton)
// }

function checkForHeldDice(){
    let heldDice = Array.from(document.getElementsByClassName("hold"))
    if(heldDice.length){
        //something is held, get dieslots of held (strings)
        if(heldDice.length === 5){
            // account for ALL dice being held
            return "all"
        }
        // let heldDieslots = held.forEach(die => console.log(die.parentElement.dataset.dieslot))
        return heldDieslots
    } else {
        return false
    }
    
}

// END INITIALIZING STUFF


//check to see if any dice held
//If not reroll all dice by
function rollHandler(event,hold){
    roll(event,hold)
}

function roll(e,hold = []){
    //
    let heldDice = checkForHeldDice()
    if(heldDice === "all"){
        // if all dice are held do not proceed with roll
        // alert "You are currently holding all of your dice. Un-hold some dice to roll them."
    } else if (heldDice){
        // some dice are held
    } else {
        // no dice are held
    }
    //
    // [1,2,3,4,4]
    console.log("roll firing",hold)
    if(hold.length === 0){
        let i = 0
        while(i<5){
            let randomNum = Math.ceil(Math.random()*6)
            dice[i]["face"] = randomNum
            dice[i]["img"] = "images/dieface-" + randomNum +".png"
            i++
        }
    } else {
        console.log("hold",hold)
    }
}

function createHoldSpan(){
    let holdSpan = document.createElement("span")
    holdSpan.classList.add("hold-span")
    holdSpan.innerText="HOLD"
    return holdSpan
}



function holdClickHandler(event){
    hold(event)
}

function unholdClickHandler(event){
    unhold(event)
}


function hold(clickEvent){
    // console.log("hold firing")
    let die = clickEvent.target
    die.removeEventListener("click",holdClickHandler)
    let dieslot = clickEvent.target.parentElement.dataset.dieslot
    let holdslot = Array.from(document.getElementById("holdslot-row").children).find(td => td.dataset.holdslot === dieslot)
    let holdSpan = createHoldSpan()
    holdslot.appendChild(holdSpan)

    // Needed? 
    die.classList.add("hold")
    die.addEventListener("click", unholdClickHandler)
}

function unhold(clickEvent){
    // console.log("unhold firing")
    let die = clickEvent.target
    
    die.removeEventListener("click", unholdClickHandler)
    
    let dieslot = clickEvent.target.parentElement.dataset.dieslot
    let holdslot = Array.from(document.getElementById("holdslot-row").children).find(td => td.dataset.holdslot === dieslot)
    // consider removing innerHTML in  different way
    holdslot.innerHTML = ""
// Remove hold class??
die.classList.remove("hold")
    die.addEventListener("click", holdClickHandler)
}

function displayDice(){
    let diceHolder = document.getElementById("dice-holder")
    let firstDiceHolderRow = Array.from(diceHolder.firstElementChild.firstElementChild.children)
    if (firstDiceHolderRow[0].innerHTML.length === 0){
        //add the dice, console.log(firstDH, firstDiceHolderRow)
        dice.forEach((die,index) => {
            let dieEle = document.createElement("img")
            dieEle.src = die["img"]
            dieEle.alt = die["face"]
            dieEle.classList.add("die")
            dieEle.addEventListener("click", holdClickHandler)
            firstDiceHolderRow[index].appendChild(dieEle)
        })
    } else {
        //
    }
}

function resetDice(){

}

// SCORING STUFF

diceAmounts = (dice) => { 
	let kinds = {}
	dice.forEach(die => {
            if(kinds[die]){
                kinds[die]++
            } else {
                kinds[die] = 1
            }
        })
	return kinds
}

let individualCountScore = (dice,num) => {
    //look at dice for specific num
    let diceCounts = diceAmounts(dice)
    if(diceCounts[num]){
        return num*diceCounts[num]
    } else {
        return 0
    }
}

let ofAKindScore = (dice,threeOrFour) => {
    let diceCounts = diceAmounts(dice)
    let amounts = Object.values(diceCounts)
    // [1,1,1,1,4]
    if (amounts.some(amount => amount >= threeOrFour)) {
		return dice.reduce((a,b) => a + b)
	} else {
    	return 0
	}
}

let threeOfAKindScore = (dice) => {
	let diceCounts = diceAmounts(dice)
	let amounts = Object.values(diceCounts)
	if (amounts.some(amount => amount >= 3)) {
		//find the die with amount > 3
		return dice.reduce((a,b) => a + b)
	} else {
    	return 0
	}
}

let fourOfAKindScore = (dice) => {
	let diceCounts = diceAmounts(dice)
	let amounts = Object.values(diceCounts)
	if (amounts.some(amount => amount >= 4)) {
		return dice.reduce((a,b) => a + b)
	} else {
    	return 0
	}
}

function fullHouseScore(dice){
    // 	[2,2,3,2,3]
    // [1,2,3,4,5]
        let kinds = diceAmounts(dice)
        if (Object.keys(kinds).length !== 2){
            // console.log("No good", kinds)
            return 0
        }
        let amounts = Object.values(kinds).sort((a,b) => a-b)
    // 	console.log("amounts",amounts)
        if(amounts[0] == 2 && amounts[1] == 3){
            return 25
        } else {
            return 0
        }
    }

    function chanceScore(dice){
        return dice.reduce((a,b) => a+b)
    }

    function yahtzeeScore(dice, bonus = "none"){
        let match = dice[0]
        for(var i = 1;i<dice.length;i++){
            if(dice[i] !== match){
                return 0
            }
        }
        if(bonus === "bonus"){
            return 100
        } else {
            return 50
        }
        
    }

initialize()