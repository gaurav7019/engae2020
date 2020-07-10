//Set Name Function
function setName(){
    let name1 = "Player 1";
    let name2 = "Player 2";
    let nameArr = document.querySelectorAll(".playerName");

    name1 = prompt("Enter the name of Player 1");
    name2 = prompt("Enter the name of Palyer 2");

    nameArr[0].textContent = name1;
    nameArr[1].textContent = name2;
}

setName();