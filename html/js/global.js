const xhrequest = new XMLHttpRequest(),
  method = "GET",
  overrideMimeType = "application/json",
  url = "../player-stats.json",
  dataSource = JSON.parse(localStorage.getItem("dataSource"));
// Player stats var
var playerStats = document.getElementById("player__stats");

// Populate dropdown on load
window.onload = populateSelect();
// -------

function populateSelect() {
  xhrequest.onreadystatechange = function() {
    if (
      xhrequest.readyState === XMLHttpRequest.DONE &&
      xhrequest.status === 200
    ) {
      const ele = document.getElementById("sel");
      const dataSource = JSON.parse(xhrequest.responseText);
      // Set LocalStorage
      localStorage.setItem("dataSource", JSON.stringify(dataSource));
      // ----------------
      for (let i = 0; i < dataSource.players.length; i++) {
        ele.innerHTML =
          ele.innerHTML +
          "<option value='" +
          dataSource.players[i].player.id +
          "'>" +
          dataSource.players[i].player.name.first +
          " " +
          dataSource.players[i].player.name.last +
          "</option>";
      }
    }
  };
  xhrequest.open(method, url, true);
  xhrequest.send();
}

function statTextRename() {
  let fwdPass = document.getElementsByClassName("fwd_pass");
  for (var k = 0; k < fwdPass.length; k++) {
    fwdPass[k].firstElementChild.innerText = "forward passes";
  }
  let goalAssist = document.getElementsByClassName("goal_assist");
  for (var k = 0; k < goalAssist.length; k++) {
    goalAssist[k].firstElementChild.innerText = "Assists";
  }
  let minsPlayed = document.getElementsByClassName("mins_played");
  for (var k = 0; k < minsPlayed.length; k++) {
    minsPlayed[k].firstElementChild.innerText = "Minutes played";
  }
  let backwardPass = document.getElementsByClassName("backward_pass");
  for (var k = 0; k < backwardPass.length; k++) {
    backwardPass[k].firstElementChild.innerText = "Backward passes";
  }
}

function playerInfoFunc(i, ele) {
  // player info var
  var playerName = document.getElementById("player__name");
  var playerPos = document.getElementById("player__pos");
  var playerClub = document.getElementById("player__club");
  var playerImg = document.getElementById("player__img");
  const correctPlayer = dataSource.players[i].player;
  // Player info
  playerName.innerText = ele.options[ele.selectedIndex].text;
  playerPos.innerText = correctPlayer.info.positionInfo.split(" ").slice(-1);

  var myStr = correctPlayer.currentTeam.name;
  var newStr = myStr.replace(" ", "-").toLowerCase();
  playerClub.innerHTML = "<span class='" + newStr + "'></span>";
  playerImg.src = "images/p" + ele.value + ".png";
  playerStats.innerHTML = "";
}

function playerStatsFunc(i) {
  const correctStats = dataSource.players[i];
  // Player stats
  for (let j = 0; j < correctStats.stats.length; j++) {
    var itemReplace = correctStats.stats[j].name.replace("_", " ");
    var figure = correctStats.stats[j].value;
    var itemTxt = document.createTextNode(itemReplace);
    var figureTxt = document.createTextNode(figure);
    var li = document.createElement("li");
    var spanStat = document.createElement("span");
    var spanText = document.createElement("span");

    li.appendChild(spanText);
    spanText.setAttribute("class", "stat");
    spanText.appendChild(itemTxt);
    //
    li.appendChild(spanStat);
    spanStat.setAttribute("class", "stat-figure");
    spanStat.appendChild(figureTxt);
    playerStats.appendChild(li).classList.add(correctStats.stats[j].name);
    // Replace
    statTextRename();
    // ------
  }
}

function show(ele) {
  for (let i = 0; i < dataSource.players.length; i++) {
    if (dataSource.players[i].player.id == ele.value) {
      document.getElementById("player-profile").classList.add("js-show");

      playerInfoFunc(i, ele);

      playerStatsFunc(i);
    }
  }
}
