import { useState } from 'react';
import './App.css';
import Chob from './assets/chob.png';
import Hee from './assets/hee.png'
import AudioChob from './assets/chob.aac';
import AudioHee from './assets/hee.aac';

function App() {
  const [audio, setAudio] = useState(new Audio(AudioHee));
  const [img, setImg] = useState(Chob);
  const [count, setCount] = useState(0);
 
  const handleMouseEvent = e => {
    e.preventDefault();
    if (e.type === 'mousedown') {
      setImg(Hee);
      setAudio(new Audio(AudioChob));
      setCount(count + 1);
      audio.play();
    } else {
      setImg(Chob);
      setAudio(new Audio(AudioHee));
      audio.play();
    }
  };

  const handleKeyEvent = e => {
    e.preventDefault();
    if (e.type === 'keydown') {
      setImg(Hee);
      setAudio(new Audio(AudioChob));
      setCount(count + 1);
      audio.play();
    } else {
      setImg(Chob);
      setAudio(new Audio(AudioHee));
      audio.play();
    }
  }

  return (
    <div className="App" onMouseDown={handleMouseEvent} onMouseUp={handleMouseEvent} onKeyDown={handleKeyEvent} onKeyUp={handleKeyEvent} >
      <div className="App__header">
        <h1 className="App__title">POPHEE</h1>
        <h2 className="App__count">{count}</h2>
      </div>
      <img className="App__image" src={img} alt='Chob Hee'/>
    </div>
  );
}

export default App;
