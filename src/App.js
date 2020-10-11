import React, {useState, useRef} from 'react';
import logo from './logo.svg';
import ImgButton from "./ImgButton";
import './App.css';
import strings from './strings';
import {
  Container,
  Row,
  Col,
  Button,
  Image, Alert, Spinner
} from 'react-bootstrap';

const defaultClassName = "justify-content-md-center mb-1"

const client = require('nekos.life');
const neko = new client();
const randoms = ["hug","pat", "kiss", "meow", "cuddle", "baka"];


function App() {
  const [nekoUrl, setNekoUrl] = useState(logo);
  const [isCopied, setCopied] = useState(false);
  const [bottomText, setBottom] = useState(strings.bottomText);

  const textAreaRef = useRef(null);
  const randomImg = async (value) => {
    setNekoUrl("");
    let cute = await neko.sfw[value]()
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
    let res = await fetch("https://nekos.life/api/v2/owoify?text=" + strings.bottomText);
    res = await res.json();
    setBottom(res.owo);
  }

  return (
    <div className="App">
      <Container className="p-3" fluid>
        <Row className={defaultClassName}>
          <h1 className="header">Welcome to CuteGif</h1>
        </Row>
        
        <Row className={defaultClassName}>
          {randoms.map((key) => 
            <ImgButton handleClick={randomImg} value={key} />
          )}
        </Row>

        <Row className={defaultClassName}>
          <Col md="auto">{nekoUrl ? <Image src={nekoUrl} fluid /> : <Spinner animation="border"><span className="sr-only">Loading</span></Spinner>}</Col>
        </Row>
        <Row className={defaultClassName}>
          <textarea className="mx-auto" ref={textAreaRef} value={nekoUrl} readOnly></textarea>
        </Row>
        <Row className={defaultClassName}>
          {
            isCopied ? <Alert variant="success">Url is copied to ur clipboard</Alert> : ""
          }
        </Row>
        <Row className={defaultClassName}>
          <p>This website was made possible because there's some really nice people who made a website with an api called <a href="https://nekos.life">nekos.life</a> 🧡</p>
          <p>
            {bottomText}
          </p>
        </Row>
        <Row className={defaultClassName}>
          <Button onClick={owoify}>OWO</Button>
        </Row>
      </Container>
    </div>
  );
}

export default App;
