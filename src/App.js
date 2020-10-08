import React, {useState, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core'
const client = require('nekos.life');
const neko = new client();
const randoms = {
  "kiss": neko.sfw.kiss,
  "hug": neko.sfw.hug,
  "pat": neko.sfw.pat,
  "meow": neko.sfw.meow,
}


function App() {
  const [nekoUrl, setNekoUrl] = useState(logo);
  const textAreaRef = useRef(null);
  const randomImg = async (value) => {
    let cute = await randoms[value]()
    setNekoUrl(cute.url);
    copyText();
  }

  const copyText = (e) => {
    console.log("Copy text triggered");
    textAreaRef.current.select();
    document.execCommand("copy");
  }

  return (
    <div className="App">
      <div id="links">
        <Button variant="contained" onClick={() => randomImg("hug")} color="primary">Random hug</Button>
        <Button variant="contained" onClick={() => randomImg("kiss")}>Random kiss</Button>
        <Button variant="contained" onClick={() => randomImg("pat")}>Random pat</Button>
        <Button variant="contained" onClick={() => randomImg("meow")}>Random meow</Button>
      </div>
      <div id="image">
        <img src={nekoUrl} alt="random cute gif"/>
      </div>
      <div id="url">  
        <textarea value={nekoUrl} ref={textAreaRef} readOnly/>
      </div>
    </div>
  );
}

export default App;
