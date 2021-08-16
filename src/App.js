import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Chob from './assets/chob.png';
import ChobWithGlasses from './assets/chob_glasses.png';
import Hee from './assets/hee.png';
import HeeWithGlasses from './assets/hee_glasses.png';
import AudioChob from './assets/chob.aac';
import AudioHee from './assets/hee.aac';
import AudioEasterEgg from './assets/chobhee_easter.mp3';

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
    user-select: none;
  }

  .App__title {
    ${props => props.rgb && 'animation: color-change 1s infinite;' }
    font-size: 45px;
  }

  .App__caption {
    ${props => props.rgb && 'animation: color-change 1s infinite;' }
    font-size: 32px;
  }

  .App__count {
    font-size: 68px;
    ${props => props.rgb && 'animation: color-change 1s infinite;' }
    ${props => props.rgb && 'font-weight: bolder;' }
    ${props => props.rgb && 'font-size: 88px;' }
  }

  .App__image {
    display: block;
    width: 100%;
  }

  @keyframes color-change {
    0% { color: red; }
    50% { color: blue; }
    100% { color: red; }
  }

  @media screen and (max-width: 540px) {
    .App__caption {
      font-size: 16px;
    }
  }
`

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [audioHee] = useState(new Audio(AudioHee));
  const [audioChob] = useState(new Audio(AudioChob));
  const [img, setImg] = useState(Chob);
  const [count, setCount] = useState(0);
  const [easter, setEaster] = useState({ reach: getRandomInt(1000, 5000), played: false })
 
  useEffect(() => {
    // Preload
    if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setIsMobile(true);
     }
    new Image().src = Chob;
    new Image().src = ChobWithGlasses;
    new Image().src = Hee;
    new Image().src = HeeWithGlasses;
  },[]);

  const actionChob = (e) => {
    if (e.type === 'keydown' && e.repeat) return;
    setImg(easter.played ? ChobWithGlasses : Chob);
    audioChob.play();
  }

  const actionHee = (e) => {
    if (e.type === 'keydown' && e.repeat) return;
    setImg(easter.played ? HeeWithGlasses : Hee);
    setCount(prevCount=> prevCount + 1);
    audioHee.play();

    if (count === easter.reach) {
      let easterAudio = new Audio(AudioEasterEgg);
      easterAudio.play();
      setEaster({ played: true });

      easterAudio.addEventListener('ended', e => {
        setEaster({ played: false });
      });
    }
  }

  return (
    <AppStyle 
      img={img} 
      onMouseUp={!isMobile && actionChob} 
      onMouseDown={!isMobile && actionHee}
      onKeyUp={actionChob}
      onKeyDown={actionHee}
      onTouchStart={actionHee}
      onTouchEnd={actionChob}
      tabIndex={-1}
      rgb={easter.played}
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
