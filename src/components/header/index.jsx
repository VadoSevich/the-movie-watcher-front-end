import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Alert } from "react-bootstrap";

import { defaultTypes, types } from "./types";

const HeaderComponent = ({ error }) => (
  <div className="mb-4">
    <div className="bg-primary">
      <Container>
        <Navbar variant="dark" className="pr-0 pl-0">
          <Navbar.Brand>
            <Link to="/" className="header__link">
              Movie List
            </Link>
          </Navbar.Brand>
        </Navbar>
      </Container>
    </div>


    {error && (
      <Alert variant="danger" transition>
        {error}
      </Alert>
    )}
  </div>
);

HeaderComponent.defaultProps = defaultTypes;
HeaderComponent.propTypes = types;

export default HeaderComponent;
