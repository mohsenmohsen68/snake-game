import { useRef, useState } from "react";
import { VscDebugStart,VscDebugStop } from "react-icons/vsc";
import "./App.css";

function App() {
  const can = useRef();
  const [bonus, setBonus] = useState(0);
  const [gameOver, setGameOver] = useState(false);

const startTheGame = ()=>{
  setBonus(0)
  setGameOver(false)
  const canvas = can.current;
  const context = canvas.getContext("2d");
  context.fillStyle = "black";
  context.fillRect(0, 0, 10, 10);
  let Xposition = [0];
  let Yposition = [0];
  let str = "goRight";
  let randomPoint = randomFood();

  window.snakeInterval = setInterval(() => {
    //if snake eats the bait ...
    if (
      randomPoint[0] * 10 === Xposition[0] &&
      randomPoint[1] * 10 === Yposition[0]
    ) {
      randomPoint = randomFood();
      setBonus((prev) => prev + 1);
      switch (str) {
        case "goRight": {
          Xposition = [
            Xposition[0] + 10,
            Xposition[0],
            ...Xposition.slice(1)
          ];
          Yposition = [Yposition[0], ...Yposition];
          break;
        }
        case "goLeft": {
          Xposition = [
            Xposition[0] - 10,
            Xposition[0],
            ...Xposition.slice(1)
          ];
          Yposition = [Yposition[0], ...Yposition];
          break;
        }
        case "goUp": {
          Xposition = [Xposition[0], ...Xposition];
          Yposition = [
            Yposition[0] - 10,
            Yposition[0],
            ...Yposition.slice(1)
          ];
          break;
        }
        case "goDown": {
          Xposition = [Xposition[0], ...Xposition];
          Yposition = [
            Yposition[0] + 10,
            Yposition[0],
            ...Yposition.slice(1)
          ];
          break;
        }
        default:
          break;
      }
    }
    context.clearRect(0, 0, 400, 400);
    context.fillStyle = "red";
    context.fillRect(randomPoint[0] * 10, randomPoint[1] * 10, 10, 10);
    context.fillStyle = "black";

    //check if the goes out of the canvas ...
    Xposition = Xposition.map((item) => {
      if (item > 400) {
        return 0;
      } else if (item < 0) {
        return 400;
      } else {
        return item;
      }
    });

    Yposition = Yposition.map((item) => {
      if (item > 400) {
        return 0;
      } else if (item < 0) {
        return 400;
      } else {
        return item;
      }
    });
    move(Xposition, Yposition, str);
//draw the snake ...
    for (let i = 0; i < Xposition.length; i++) {
      context.fillRect(0 + Xposition[i], 0 + Yposition[i], 10, 10);
    }
//program logic when the user hits arrow keys ...
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 37: {
          str = "goLeft";
          break;
        }
        case 38:
          str = "goUp";
          break;
        case 39:
          str = "goRight";
          break;
        case 40:
          str = "goDown";
          break;
        default:
          break;
      }
    };
// game over logic ... snake hitting itself ...
    if (conflict(Xposition, Yposition)) {
      setGameOver(true);
      clearInterval(window.snakeInterval)
    }
    
  }, 362);
  
}

const stopTheGame = ()=>{
 clearInterval(window.snakeInterval)
 setGameOver(true)
}
  const randomFood = () => {
    let x = Math.floor(Math.random() * 40);
    let y = Math.floor(Math.random() * 40);
    return [x, y];
  };

  const move = (Xposition, Yposition, direction) => {
    let tempx = [];
    let tempy = [];
    for (let i = 0; i < Xposition.length; i = i + 1) {
      tempx[i] = Xposition[i];
      tempy[i] = Yposition[i];
    }
    switch (direction) {
      case "goRight": {
        Xposition[0] = Xposition[0] + 10;
        for (let i = 1; i < Xposition.length; i = i + 1) {
          Xposition[i] = tempx[i - 1];
          Yposition[i] = tempy[i - 1];
        }
        break;
      }
      case "goLeft": {
        Xposition[0] = Xposition[0] - 10;
        for (let i = 1; i < Xposition.length; i = i + 1) {
          Xposition[i] = tempx[i - 1];
          Yposition[i] = tempy[i - 1];
        }
        break;
      }
      case "goUp": {
        Yposition[0] = Yposition[0] - 10;
        for (let i = 1; i < Xposition.length; i = i + 1) {
          Xposition[i] = tempx[i - 1];
          Yposition[i] = tempy[i - 1];
        }
        break;
      }
      case "goDown": {
        Yposition[0] = Yposition[0] + 10;
        for (let i = 1; i < Xposition.length; i = i + 1) {
          Xposition[i] = tempx[i - 1];
          Yposition[i] = tempy[i - 1];
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  const conflict = (Xposition, Yposition) => {
    for (let i = 0; i < Xposition.length; i = i + 1) {
      for (let j = i; j < Xposition.length; j = j + 1) {
        if (i !== j) {
          if (Xposition[i] === Xposition[j] && Yposition[i] === Yposition[j]) {
            return true;
          }
        }
      }
    }
    return false;
  }


  return (
    <div className="container">
      <canvas ref={can} width="400px" height="400px" id="canvas" />
      <br />
      <div className="btnContainer">
      <button onClick={()=>startTheGame()} className="btn"><VscDebugStart/></button>
      <button onClick={()=>stopTheGame()} className="btn"><VscDebugStop/></button>
      </div>
      <h1>
      {bonus}
      </h1> 
      <h1 className={`${gameOver?'fail':'success'}`}>
      {gameOver ? 'gameover': 'isPlaying'}
      </h1>
    </div>
  );
}

export default App;
