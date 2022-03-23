import React from "react";
import { Container, Row, Col } from "reactstrap";

import BackgroundAnimation from "../BackgroundAnimation/BackgroundAnimation";

const HeroComponent = ({ isLanding, size }) => (
  <Container className="py-lg-md d-flex">
    <div className="col px-5">
      <Row>
        {isLanding && (
          <Col lg="6">
            <h1 className="display-1 padding-top text-white">
              Loop
              <span style={{ fontSize: "0.8em" }}>Supporting creators 3.0</span>
            </h1>
            <p className="display-3 lead text-white">
              A platform that helps you support your favourite creators without
              draining your pockets.
            </p>
          </Col>
        )}
        <Col lg={size} className="background-animation">
          <BackgroundAnimation />
        </Col>
      </Row>
    </div>
  </Container>
);

export default HeroComponent;
