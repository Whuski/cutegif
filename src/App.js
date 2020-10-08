import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
const client = require('nekos.life');
const neko = new client();
const randoms = {
  "kiss": neko.sfw.kiss,
  "hug": neko.sfw.hug,
  "pat": neko.sfw.pat,
  "meow": neko.sfw.meow,
}

function App() {
  const [nekoUrl, setNekoUrl] = useState("");

  const randomImg = async (value) => {
    let cute = await randoms[value]()
    setNekoUrl(cute.url);
    console.log(cute.url);
  }

  return (
    <div className="App">
      <div id="links">
        <a href="#" onClick={() => randomImg("hug")}>Random hug</a>
        <a href="#" onClick={() => randomImg("kiss")}>Random kiss</a>
        <a href="#" onClick={() => randomImg("pat")}>Random pat</a>
        <a href="#" onClick={() => randomImg("meow")}>Random meow</a>
      </div>
      <div id="image">
        <img src={nekoUrl} alt="rando cute gif"/>
      </div>
      <div id="url">
        <textarea value={nekoUrl} readOnly/>
      </div>
    </div>
  );
}

export default App;
