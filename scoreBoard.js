const container = document.querySelector(".container");

//
function handleLoadingScore() {
  axios.get("http://localhost:4000/getpoints").then(({ data: db }) => {
    console.log(db[0].username);
    //This function Sorts out by the 'winBy points'
    for (let i = 0; i < db.length - 1; i++) {
      let p = db[i].winby_points;
      let a = db[i + 1].winby_points;
      if (p < a) {
        db[i + 1].winby_points = p;
        db[i].winby_points = a;
        console.log("test");
      }
    }

    // db.sort((a, p) => p.winby_points - a.winby_points);
    console.log(db);

    for (let i = 0; i < db.length; i++) {
      //   console.log(db[i].username);
      let card = document.createElement("div");
      let username = document.createElement("span");
      let playerPointscard = document.createElement("span");
      let computerPointscard = document.createElement("span");
      let differenceInScorecard = document.createElement("span");

      username.textContent = "username: " + db[i].username;
      playerPointscard.textContent = db[i].playerpoints;
      computerPointscard.textContent = db[i].computerpoints;
      differenceInScorecard.textContent = db[i].winby_points;

      card.append(
        username,
        playerPointscard,
        computerPointscard,
        differenceInScorecard
      );
      container.append(card);
    }
  });
}

handleLoadingScore();
