let boxes = document.querySelectorAll ('.box');
let resetBtn = document.querySelector ('#reset-btn');
let newGameBtn = document.querySelector('#new-game-btn');
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector('#msg');

let turn0 = true;// player X, player Y
let count = 0;// to track draw

const winPatterns  = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame = () =>{
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach ((box) => {

    box.addEventListener('click', () => {
        if (turn0){
            box.innerText = 'O';
            turn0 = false;
        }else{
            box.innerText = 'X';
            turn0 = true;
        }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner){
        gameDraw();
    }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw 😜`
    msgContainer.classList.remove ('hide');
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = '';
    }
};


const showWinner = (winner)=>{
    msg.innerText = `Congratulation ${winner} is the winner`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns){

        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 != '' && posVal2 != '' && posVal3 != '' ) {
            if ( posVal1 === posVal2 && posVal2 === posVal3) {
                showWinner (posVal1);  
                return true;
            }
        }
    }
};
newGameBtn.addEventListener ('click', resetGame);
resetBtn.addEventListener ("click", resetGame);
