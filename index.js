const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// let playerPoints = 5000; 

// if (localStorage.getItem("playerPoints")) {
//   playerPoints = parseInt(localStorage.getItem("playerPoints"));
// }

// app.get("/", (req, res) => {
//     res.json({points:playerPoints})
// })

app.post("/roll-dice", (req, res) => {
  const { betAmount, betOption, playerPoints } = req.body;
  const diceNumber1 = Math.floor(Math.random() * 6) + 1;
  const diceNumber2 = Math.floor(Math.random() * 6) + 1;
  let result;
  let winnings;

  if (betOption === "7_up" && ((diceNumber1+diceNumber2) > 7)) {
    result = "WIN";
    winnings = (2 * betAmount)-betAmount;
  } else if (betOption === "7" && ((diceNumber1+diceNumber2)  === 7)) {
    result = "WIN";
    winnings = (5 * betAmount)-betAmount;
  } else if (betOption === "7_down" && ((diceNumber1+diceNumber2)  < 7)) {
    result = "WIN";
    winnings =( 2 * betAmount)-betAmount;
  } else {
    result = "LOSE";
    winnings = -betAmount;
  }

  const points = playerPoints + winnings;

  // Save player's points to local storage
//   localStorage.setItem("playerPoints", playerPoints);

  return res.json({ number1: diceNumber1, number2:diceNumber2, result, points });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
