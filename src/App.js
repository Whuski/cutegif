import React, {useState, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const client = require('nekos.life');
const neko = new client();
const randoms = {
  "kiss": neko.sfw.kiss,
  "hug": neko.sfw.hug,
  "pat": neko.sfw.pat,
  "meow": neko.sfw.meow,
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    textAlign: 'center',
    margin: '2em'
  }
}));


function App() {
  const classes = useStyles();
  const [nekoUrl, setNekoUrl] = useState(logo);
  const [isCopied, setCopied] = useState(false);

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

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => randomImg("hug")}>Random hug</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => randomImg("kiss")}>Random kiss</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => randomImg("pat")}>Random pat</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => randomImg("meow")}>Random meow</Button>
          </Grid>
        </Grid>
        <div id="image" className={classes.image}>
          <img src={nekoUrl} alt="random cute gif"/>
        </div>
        <div id="url">  
          <textarea value={nekoUrl} ref={textAreaRef} readOnly/>
          <p>{isCopied ? "URL COPIED TO UR CLIPBOARD" : ""}</p>
        </div>
        <div>
          <p>This website was made possible thanks to the mega cool guys at <a href="https://nekos.life">nekos.life</a> ! ❤</p>
          <p>Do not base anything over this really badly made website, I'm using it to learn a bunch of javascript framework and mostly made it for myself</p>
          <p>Please do not beat me up for this code, I know it's not good</p>
        </div>

      </Container>
      
      </div>        
        
        
        
      

      

  );
}

export default App;
