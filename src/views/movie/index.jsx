import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, ListGroup, Button } from "react-bootstrap";

import Header from "@components/header";

import withHooks from "./withHooks";


const Movie = ({ movieCurrent: {title = "" , release = "", format = "", stars = ""} }) => {
  return (
    <>
      <Header/>
      <Container>
        <Row>
          <Link to="/">
            <Button className="mb-4" block>Back</Button>
          </Link>
        </Row>

        <Row>
          <ListGroup>
            <ListGroup.Item>{`Title: ${title}`}</ListGroup.Item>
            <ListGroup.Item>{`Release: ${release}`}</ListGroup.Item>
            <ListGroup.Item>{`Format: ${format}`}</ListGroup.Item>
            <ListGroup.Item>{`Stars: ${stars}`}</ListGroup.Item>
          </ListGroup>
        </Row>
      </Container>
    </>
  );
};

export default withHooks(Movie);
