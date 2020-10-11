import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


function ImgButton(props) {
    return (
    <Col md="auto pb-1"><Button variant="primary" onClick={() => props.handleClick(props.value)}>RANDOM {props.value.toUpperCase()}</Button></Col>
    )
}


export default ImgButton;