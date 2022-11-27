import { useEffect, useState } from 'react'
import './App.css'
import { createCanvas } from 'canvas' 

function App() {
  const [canva, setCanva] = useState<string | undefined>();

  //https://www.npmjs.com/package/canvas#createimagedata
  const getCanvas = (colors: number[][]) => {
    const width = 256;
    const height = 128;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
  
    const imgData = ctx.createImageData(width, height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const cPos = i / 4;
      imgData.data[i] = colors[cPos][0];
      imgData.data[i + 1] = colors[cPos][1];
      imgData.data[i + 2] = colors[cPos][2];
      imgData.data[i + 3] = colors[cPos][3];
    }
    ctx.putImageData(imgData, 0, 0);
  
    return canvas.toDataURL();
  }
  
  const getPalette = () => {
    const palette: number[][] = [];
    const steps: number = 32;
    const incrementFactor: number = 8;
    //fill the array with 32 of incremental numbers based on 8 as the incremental factor
    const allPossibles: number[] = new Array(steps + 1).fill(0).map((_, i) => i * incrementFactor);
    //clean up the array, remove first unused value
    allPossibles.shift();

    //fill the color rgb palette with distinct value.
    allPossibles.forEach(r => {
      allPossibles.forEach(g => {
        allPossibles.forEach(b => {
          palette.push([r, g, b, 255]);
        });
      });
    });
  
    return palette;
  };

  useEffect(() => {
    const palette = getPalette();
    const canvaUrl = getCanvas(palette);
    setCanva(canvaUrl);
  }, [])

  return (
    <div className="App">
      <figure
        style={{ width: '100%', height: '100%' }}
      >
        {canva && (
          <img
            src={canva}
            alt="colorful"
          />
        )}
      </figure>
    </div>
  )
}

export default App