const cells=document.querySelectorAll(".cell");
const Statustext=document.querySelector(".Status");
const resetbtn=document.querySelector(".reset");
const win1=document.querySelector(".wins_player_x");
const win2=document.querySelector(".wins_player_o");
const loss1=document.querySelector(".loss_player_x");
const loss2=document.querySelector(".loss_player_o");
const Playerx=document.querySelector(".playerx")
const Playero=document.querySelector(".playero")
let Player_X=prompt("Player X:Please Enter Your Name")
let Player_O=prompt("Player O:Please Enter Your Name");
let Win1=0;
let Win2=0;
let Loss1=0;
let Loss2=0;

let options=["","","","","","","","",""];
let winconditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let currentplaying=Player_X;
let running=false;
let index="X";
Playerx.textContent=`${Player_X} - X`;
Playero.textContent=`${Player_O} - O`;


resetbtn.addEventListener("mouseover",changebackground)

function changebackground(event){
    event.target.style.backgroundColor='lavender';
};

resetbtn.addEventListener("mouseout",event=>{
    event.target.style.backgroundColor='#E8E9EB';
});

startgame();

function startgame(){
    cells.forEach(cell=>cell.addEventListener("click",cellclicked));
    Statustext.textContent=`${Player_X}'s(${index}) turn`;
    resetbtn.addEventListener("click",checker);
    running=true;
}


function cellclicked(){
    const cellindex=this.getAttribute("cellIndex")
    if (options[cellindex]!="" || !running){
        return;
    };

    updatecell(this,cellindex); 
    checkwinner();
};

function updatecell(cell,Index){
    options[Index]=index;
    cell.textContent= index;
};

function changeplayer(){
    currentplaying=(currentplaying==Player_X)? Player_O: Player_X;
    index=(index=="X")? "O": "X";
    Statustext.textContent=`${currentplaying}'s(${index}) turn`;
}

function checkwinner(){
    let won=false;

    for(let i = 0; i < winconditions.length; i++){
        const condition = winconditions[i];
        const A = options[condition[0]];
        const B = options[condition[1]];
        const C = options[condition[2]];

        if(A == "" || B == "" || C == ""){
            continue;
        }
        if(A == B && B == C){
            won = true;
            break;
        }
    }

    if(won){
        Statustext.textContent = `${currentplaying}(${index}) WINS!`;
        running = false;
        setTimeout(resetgame,5000);
        updateScore();
    }
    else if(!options.includes("")){
        Statustext.textContent = `IT'S A TIE!`;
        running = false;
        setTimeout(resetgame,5000);
    }
    else{
        changeplayer();
    }
};

function updateScore(){
    console.log(currentplaying);
    if(currentplaying === Player_X){
        Win1=Win1+1;
        Loss2=Loss2+1;
    }
    else{
        Win2=Win2+1;
        Loss1=Loss1+1;
    }
    console.log("updatescores:", Win1, Win2, Loss1, Loss2);
    win1.textContent=`${Win1}`;
    win2.textContent=`${Win2}`;
    loss1.textContent=`${Loss1}`;
    loss2.textContent=`${Loss2}`;
    store();
};

function store(){
    localStorage.setItem(Player_X,Win1);
    localStorage.setItem(Player_O,Win2);
}

function resetgame(){
    options = ["", "", "", "", "", "", "", "", ""];
    Statustext.textContent = `${currentplaying}'s(${index}) turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
};

function checker(){
    let select = confirm("DO YOU WANT TO RESTART THE GAME?")
    if(select==false){
        Event.prevendefault();
    } else{
        resetgame();
    }
}
