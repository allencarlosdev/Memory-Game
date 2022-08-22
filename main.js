//Variable initialization
let showCards= 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer= false;
let time= 30;
let timeLeftId= null;
let initialTime= time;

// Pointing to HTML document
let showMovements = document.getElementById("movements");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("time-left");

//Random number generation
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{
    return Math.random()-0.5
})
console.log(numbers);

//functions 

function blockCards(){
    for(let i = 0; i<=15; i++){
        let lockedCard = document.getElementById(i);
        lockedCard.innerHTML = numbers[i];
        lockedCard.disabled = true;
    }
    showHits.innerHTML= `💩 Hits: ${hits} You Lost 👎💩`;
    showTime.innerHTML= `Time: It's Over`;
    showMovements.innerHTML= `Movements: ${movements} 😩`;
}

function countTime(){
    timeLeftId = setInterval(()=>{
        time--;
        showTime.innerHTML= `Time: ${time} seconds`;
        if(time === 0){
            clearInterval(timeLeftId);
            blockCards();
        }
    },1000);
}



//Principal function
function show(id){

    if(timer === false){
        countTime();
        timer= true;
    }

    showCards++;
    console.log(showCards);

    if(showCards === 1){
        //Show the first number
        card1 = document.getElementById(id);
        firstResult = numbers[id]
        card1.innerHTML = firstResult;

        //Disable the first button
        card1.disabled = true;

    }else if(showCards === 2){
        //Show second number
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;

        // Disable the second button
        card2.disabled = true;

        //Increase movements
        movements++;
        showMovements.innerHTML = `Movements: ${movements}`;

        if(firstResult === secondResult){
            //reset counter to 0
            showCards = 0;

            //Increase hits
            hits++;
            showHits.innerHTML= `Hits: ${hits}`;

            if(hits === 8){
                clearInterval(timeLeftId);
                showHits.innerHTML= `✨ Hits: ${hits} 👍You Win✨`;
                showTime.innerHTML= `Time: ${initialTime - time}s`;
                showMovements.innerHTML= `Movements: ${movements} 😱💪`;
            }
        }else{
            // Momentarily show values and cover again
            setTimeout(()=>{
                card1.innerHTML= "?";
                card2.innerHTML= "?";
                card1.disabled= false;
                card2.disabled= false;
                showCards= 0;
            },800);
        }
    }
}