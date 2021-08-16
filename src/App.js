import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Chob from './assets/chob.png';
import Hee from './assets/hee.png'
import AudioChob from './assets/chob.aac';
import AudioHee from './assets/hee.aac';

const AppStyle = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background: url(${(props) => props.img || 'white'});
  background-position: center;
  background-repeat: no-repeat;

  .App__header {
    position: absolute;
    width: 100%;
    height: 1080px;
    text-align: center;
    color: white;
    padding: 1em;
    text-shadow: 2px 2px solid black;
  }

  .App__title {
    font-size: 45px;
  }

  .App__caption {
    font-size: 32px;
  }

  .App__count {
    font-size: 68px;
  }

  .App__image {
    display: block;
    width: 100%;
  }

  @media screen and (max-width: 540px) {
    .App__caption {
      font-size: 16px;
    }
  }
`

function App() {
  const [audioHee] = useState(new Audio(AudioHee));
  const [audioChob] = useState(new Audio(AudioChob));
  const [img, setImg] = useState(Chob);
  const [count, setCount] = useState(0);
 
  useEffect(() => {
    // Preload
    new Image().src = Chob;
    new Image().src = Hee;
  },[]);

  const actionChob = (e) => {
    if (e.type === 'keydown' && e.repeat) return;
    setImg(Chob);
    audioChob.play();
  }

  const actionHee = (e) => {
    if (e.type === 'keydown' && e.repeat) return;
    setImg(Hee);
    setCount(prevCount=> prevCount + 1);
    audioHee.play();
  }

  return (
    <AppStyle 
      img={img} 
      onMouseUp={actionChob} 
      onMouseDown={actionHee}
      onKeyUp={actionChob}
      onKeyDown={actionHee}
      onTouchStart={actionHee}
      onTouchEnd={actionChob}
      tabIndex={-1}
    >
      <div className="App__header">
        <h1 className="App__title">POPHEE</h1>
        <p className="App__caption">วันพระวันเจ้าไม่เว้นกันเล้ย...อยากจะ POP แต่ HEE</p>
        <h2 className="App__count">{count}</h2>
      </div>
    </AppStyle>
  );
}

export default App;
