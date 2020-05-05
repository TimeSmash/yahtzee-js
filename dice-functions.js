// let dice = []
let score = 0
let diceCounts = {}

function run(){
    let start = document.getElementById("start")
    start.addEventListener("click", () => alert("HEY"))
}

function gameStart(){
    let pointboxes = Array.from(document.getElementsByClassName("pointbox"))
    pointboxes.forEach(box => box.innerText= "")
}



function roll(hold = []){
    // [1,2,3,4,4]
    if(hold.length === 0){
        let i = 0
        while(i<5){
            dice[i] = Math.ceil(Math.random()*6)
        }
    } else {
        dice.filter()
    }
}

function resetDice(){

}

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

run()