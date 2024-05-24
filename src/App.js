import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const can = useRef();

  useEffect(() => {
    const canvas = can.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "blue";
    context.fillRect(0, 0, 9, 9);
    let scaleX = 0;
    let scaleY = 0;
    let str = 'goRight';
    setInterval(() => {
      context.clearRect(0, 0, 200, 400);
      // scaleX = scaleX + 9;
      if (scaleX > 200) {
        scaleX = 0;
      }
      if (scaleY > 400) {
        scaleY = 0;
      }
      if (scaleX < 0) {
        scaleX = 200;
      }
      if (scaleY < 0) {
        scaleY = 400;
      }
      switch(str)
      {
        case 'goRight':{
          scaleX = scaleX + 9
          break;
        }
        case 'goLeft':{
          scaleX =scaleX - 9
          break;
        }
        case 'goUp':{
          scaleY = scaleY - 9
          break;
        }
        case 'goDown':{
          scaleY = scaleY + 9
          break;
        }
        default:
          break;
        }
      context.fillRect(0 + scaleX, 0+scaleY, 9, 9);
      document.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37: {
            str = 'goLeft' 
            console.log('left')
            break;
          }
          case 38:
            str = 'goUp'
            console.log('up')
            break;
          case 39:
            str = 'goRight'
            console.log('right')
            break;
          case 40:
            str = 'goDown'
            console.log('down')
            break;
          default:
            break;
        }
      };
    }, 362);
  }, []);

  console.log(can);
  return (
    <div>
      <canvas ref={can} width="200px" height="400px" id="canvas" />
    </div>
  );
}

export default App;
