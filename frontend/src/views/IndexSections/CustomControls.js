import React from "react";
import { Row, Col } from "reactstrap";

class CustomControls extends React.Component {
  state = {
    simpleValue: 100.0,
    rangeLow: 200.0,
    rangeHigh: 400.0,
  };

  render() {
    return (
      <>
        <Row>
          <Col lg="3" md="6">
            {/* Checkboxes */}
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">
                Checkboxes
              </small>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                id="customCheck1"
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                <span>Unchecked</span>
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                defaultChecked
                id="customCheck2"
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="customCheck2">
                <span>Checked</span>
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                disabled
                id="customCheck3"
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="customCheck3">
                <span>Disabled Unchecked</span>
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                defaultChecked
                disabled
                id="customCheck4"
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="customCheck4">
                <span>Disabled Checked</span>
              </label>
            </div>
          </Col>
          <Col className="mt-4 mt-md-0" lg="3" sm="6">
            {/* Radio buttons */}
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">Radios</small>
            </div>
            <div className="custom-control custom-radio mb-3">
              <input
                className="custom-control-input"
                id="customRadio1"
                name="custom-radio-1"
                type="radio"
              />
              <label className="custom-control-label" htmlFor="customRadio1">
                <span>Unchecked</span>
              </label>
            </div>
            <div className="custom-control custom-radio mb-3">
              <input
                className="custom-control-input"
                defaultChecked
                id="customRadio2"
                name="custom-radio-1"
                type="radio"
              />
              <label className="custom-control-label" htmlFor="customRadio2">
                <span>Checked</span>
              </label>
            </div>
            <div className="custom-control custom-radio mb-3">
              <input
                className="custom-control-input"
                disabled
                id="customRadio3"
                name="custom-radio-2"
                type="radio"
              />
              <label className="custom-control-label" htmlFor="customRadio3">
                <span>Disabled unchecked</span>
              </label>
            </div>
            <div className="custom-control custom-radio mb-3">
              <input
                className="custom-control-input"
                defaultChecked
                disabled
                id="customRadio4"
                name="custom-radio-2"
                type="radio"
              />
              <label className="custom-control-label" htmlFor="customRadio4">
                <span>Disabled checkbox</span>
              </label>
            </div>
          </Col>
          <Col className="mt-4 mt-md-0" lg="3" sm="6">
            {/* Toggle buttons */}
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">
                Toggle buttons
              </small>
            </div>
            <label className="custom-toggle">
              <input type="checkbox" />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
            <span className="clearfix" />
            <label className="custom-toggle">
              <input defaultChecked type="checkbox" />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
          </Col>
        </Row>
      </>
    );
  }
}

export default CustomControls;
