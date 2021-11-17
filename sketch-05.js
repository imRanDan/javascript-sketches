const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

let text = 'D';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = decoument.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'white';
    typeContext.fillRect(0, 0, cols, height);

    typeContext.fillStyle = 'black';
    typeContext.font =  `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';


    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (cols - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(x, y);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();
  };
};

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', onKeyUp);


const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();




