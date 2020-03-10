let names = ['Kane Richard','Kevin Dane','Mark Clive','Ashton Pratt','Ben Parker', 'Steve Rogers', 'Johnny Storm', 'Susan Storm', 'Ben Grimm', 'Reed Richards', 'Peter Quill', 'Ben Parker', 'Clint Barton'];
let selectCell = new Map();
let available = [], allUsers = [];
let nameList = document.querySelector(".nameList");
let cellList = document.querySelector(".cellList");
let nameString = "", cellString = "", cellNumber = 42;

function initList() {
  for (let i = 0; i < names.length; i++) {
    let tempUser = `<div id ="${"user" + i}" 
      class="name" draggable="true" ondragstart="dragStarted(event)">
      <p>${names[i]}</p></div>`;
    nameString += tempUser;
    available.push(tempUser);
    allUsers.push(tempUser);
  }
  nameList.innerHTML = "<p>" + nameString + "</p>";
}

function initGrid() {
  initList();
  for (let i = 0; i < cellNumber; i++) {
    let tempUser = `<div id = "${"cell" + i}" class="uniqueCell"
        ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
    cellString += tempUser;
    selectCell.set(`cell${i}`, false);
  }
  cellList.innerHTML = cellString;
}

function dragStarted(event) {
  event.dataTransfer.setData("text", event.target.id);
  nextCell();
}

function nextCell() {
  for (let i = 0; i < cellNumber; i++) {
    if (document.getElementById(`cell${i}`).innerHTML == "")
       selectCell.set(`cell${i}`, false);
    if (selectCell.get(`cell${i}`) === false) {
      document.getElementById(`cell${i}`).style = "background-color: #FFFF20";
      console.log(`cell${i}`);
      break;
    }
  }
}

document.addEventListener("dragend",function (event) {
  for (let i = 0; i < cellNumber; i++) {
    document.getElementById(`cell${i}`).style = "background-color: white";
  }},false);

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  userCell = document.getElementById(data);
  userCell.style = "border-style:none";
  for (let i = 0; i < available.length; i++) {
    if (available[i].includes(userCell.id)) {
      available.splice(i, 1);
      break;
    }
  }
  let cross = `<img id=${"cancel" +userCell.id} src="./images/cross.png" onClick="removeUser(this)" style="width:20px; height: 15px"/>`;
  userCell.innerHTML += cross;
  event.target.appendChild(userCell);
  selectCell.set(`${event.target.id}`, true);
}

function allowDrop(event) {
  event.preventDefault();
}

function removeUser(imgElement) {
  let delId = imgElement.id.substring(6);
  for (let i = 0; i < allUsers.length; i++) {
     if (allUsers[i].includes(delId)) {
      available.push(allUsers[i]);
      break;
    }
  }
  let updatedAvailable = "";
  for (let i = 0; i < available.length; i++) {
    updatedAvailable += available[i];
  }
  document.getElementById(delId).remove();
  nameList.innerHTML = "<p>" + updatedAvailable + "</p>";
}

