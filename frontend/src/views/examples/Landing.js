import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import HeroComponent from "../../components/Hero/hero";

const creatorsList = [
  {
    name: "Ryan Tompson",
    username: "ryan_tompson",
    imgURL:
      "https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Romina Hadid",
    username: "romina_hadid",
    imgURL:
      "https://images.unsplash.com/photo-1534008757030-27299c4371b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybHN8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Alexander Smith",
    username: "alex_17",
    imgURL:
      "https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/istock-1069995244.jpg?itok=RVd1xsST",
  },
  {
    name: "John Doe",
    username: "john_doe",
    imgURL:
      "https://images.financialexpress.com/2020/08/Sumedh.jpeg?w=1200&h=800&imflag=true",
  },
];

const Landing = () => {
  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg landing-page pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
            <HeroComponent isLanding={true} size="6" />
          </section>
        </div>
        <section className="section section-lg">
          <Container>
            <Link to="/creators">
              <div className="text-right">
                <Button className="text-default" color="link">
                  View all Creators
                </Button>
              </div>
            </Link>
            <Row>
              {creatorsList.map((el) => (
                <Col className="mb-5 mb-lg-0" lg="3" md="6" key={el.name}>
                  <div className="px-4">
                    <img
                      alt={el.name}
                      className="rounded-none"
                      src={el.imgURL}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">{el.name}</span>
                        <small className="h6 text-muted">{el.username}</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="warning"
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                        >
                          <i className="fa fa-instagram" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                        >
                          <i className="fa fa-youtube" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className="section section-lg bg-gradient-default">
          <Container className="pt-lg pb-300">
            <Row className="text-center justify-content-center">
              <Col lg="10">
                <h2 className="display-3 text-white">Lose Nothing...</h2>
                <p className="lead text-white">
                  Do you want your favourite creators to keep talking about
                  sponsored products? If yes, move on to{" "}
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    Youtube
                  </a>
                </p>
              </Col>
            </Row>
            <Row className="row-grid mt-5 ml-6">
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-settings text-primary" />
                </div>
                <h5 className="text-white mt-3">Don't spend a dime</h5>
                <p className="text-white mt-3">
                  You get your entire deposited amount back anytime, creators
                  get to keep interests
                </p>
              </Col>
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-ruler-pencil text-primary" />
                </div>
                <h5 className="text-white mt-3">Fast and easy</h5>
                <p className="text-white mt-3">
                  Pay with your favourite wallet, quick and simple
                </p>
              </Col>
              <Col lg="4">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-atom text-primary" />
                </div>
                <h5 className="text-white mt-3">Secure</h5>
                <p className="text-white mt-3">
                  Inherits the security of your favourite blockchain
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section-lg section-nucleo-icons pb-250">
          <Link to="/creators">
            <div className="blur--hover">
              <div className="icons-container blur-item mt-5 on-screen">
                <i className="icon ni ni-diamond" />
                <i className="icon icon-sm ni ni-single-02" />
                <i className="icon icon-sm ni ni-single-02" />
                <i className="icon icon-sm ni ni-single-02" />
                <i className="icon ni ni-single-02" />
                <i className="icon ni ni-single-02" />
                <i className="icon ni ni-single-02" />
                <i className="icon icon-sm ni ni-single-02" />
                <i className="icon icon-sm ni ni-single-02" />
                <i className="icon icon-sm ni ni-single-02" />
                <i className="icon ni ni-single-02" />
                <i className="icon ni ni-single-02" />
                <i className="icon ni ni-single-02" />
              </div>
              <span className="blur-hidden h5 text-success">
                Explore all the 21,000+ creators
              </span>
            </div>
          </Link>
        </section>
      </main>
      <CardsFooter />
    </>
  );
};

export default Landing;
