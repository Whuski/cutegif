import React, {useState, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import strings from './strings';
import {
  Container,
  Row,
  Col,
  Button,
  Image, Alert
} from 'react-bootstrap';


const client = require('nekos.life');
const neko = new client();
const randoms = {
  "kiss": neko.sfw.kiss,
  "hug": neko.sfw.hug,
  "pat": neko.sfw.pat,
  "meow": neko.sfw.meow,
  "cuddle": neko.sfw.cuddle,
}


function App() {
  const [nekoUrl, setNekoUrl] = useState(logo);
  const [isCopied, setCopied] = useState(false);
  const [bottomText, setBottom] = useState(strings.bottomText);

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
    setCopied(true);
  }
  
  const owoify = async (e) => {
    let res = await fetch("https://nekos.life/api/v2/owoify?text=" + strings.eng.bottomText);
    res = await res.json();
    setBottom(res.owo);
  }

  return (
    <Container className="p-3">
      <Row className="justify-content-md-center">
        <h1 className="header">Welcome to CuteGif</h1>
      </Row>
      
      <Row className="justify-content-md-center mb-5">
        <Col md="auto"><Button variant="primary" onClick={() => randomImg("hug")}>RANDOM HUGS</Button></Col>
        <Col md="auto"><Button variant="primary" onClick={() => randomImg("pat")}>RANDOM PAT</Button></Col>
        <Col md="auto"><Button variant="primary" onClick={() => randomImg("kiss")}>RANDOM KISS</Button></Col>
        <Col md="auto"><Button variant="primary" onClick={() => randomImg("meow")}>RANDOM MEOW</Button></Col>
        <Col md="auto"><Button variant="primary" onClick={() => randomImg("cuddle")}>RANDOM CUDDLE</Button></Col>
      </Row>

      <Row className="justify-content-md-center mb-5">
        <Image src={nekoUrl} />
      </Row>
      <Row className="justify-content-md-center mb-5">
        <textarea ref={textAreaRef} value={nekoUrl}></textarea>
      </Row>
      <Row className="justify-content-md-center">
        {
          isCopied ? <Alert variant="success">Url is copied to ur clipboard</Alert> : ""
        }
      </Row>
      <Row>
        <p>This website was made possible because there's some really nice people who made a website with an api called <a href="nekos.life">nekos.life</a> 🧡</p>
        <p>
          {bottomText}
        </p>
      </Row>
      <Row>
        <Button onClick={owoify}>OWO</Button>
      </Row>
    </Container>
  );
}

export default App;
