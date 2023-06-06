import React, { useState } from "react";
import "./attendance.css";
import InfoIcon from "../../assets/info.png";
import SettingIcon from "../../assets/setting.png";
import {
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import Select from "react-select";

const Attendance = () => {
  const initialFormData = {
    branchCode: "",
    brand: null,
    salesType: null,
    productType: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("branchCode", formData.branchCode);
    formDataToSend.append("brand", formData.brand.value);
    formDataToSend.append("salesType", formData.salesType.value);
    formDataToSend.append("productType", formData.productType.value);
    handleSuccess();
  };
  const handleSuccess = () => {
    setFormData(initialFormData);
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const salesType = [
    { value: "Transactional selling", label: "Transactional selling" },
    { value: "Solution selling", label: "Solution selling" },
    { value: "Consultative selling", label: "Consultative selling" },
  ];

  const productType = [
    { value: "Shopping Goods", label: "Shopping Goods" },
    { value: "Specialty Goods", label: "Specialty Goods" },
    { value: "Unsought Goods", label: "Unsought Goods" },
  ];

  return (
    <div className="align-items-center bg-light d-flex flex-column justify-content-between rounded-3 mt-3">
      <div className="d-flex p-3 w-100 flex-column">
        <div className="d-flex justify-content-between w-100">
          <button className="bg-transparent border-0">
            <img src={InfoIcon} alt="" />
          </button>
          <button className="btn btn-primary d-flex align-items-center justify-content-center setting_btn">
            <img src={SettingIcon} alt="" />
          </button>
        </div>
        <Container className="mt-4">
          <div className="height-2rem position-relative">
            <ProgressBar variant="danger" now={33} />
            <div className="pointers-group">
              <div>
                <div className="pointers visited">
                  <span></span>
                </div>
                <small>Share Location</small>
              </div>
              <div className="text-center">
                <div className="pointers mx-auto active">
                  <span></span>
                </div>
                <small>Clock In</small>
              </div>
              <div className="text-center">
                <div className="pointers mx-auto">
                  <span></span>
                </div>
                <small>Working On</small>
              </div>
              <div className="text-center">
                <div className="pointers ms-auto">
                  <span></span>
                </div>
                <small>Clock Out</small>
              </div>
            </div>
          </div>
        </Container>
        <br />
        <hr />
        <div className="bg-white d-flex justify-content-center shadow">
          <p className="m-3">
            After&nbsp;
            <span className="bg-danger text-white rounded px-1">4:30</span>
            &nbsp;This page will be refresh
          </p>
        </div>
        <div className="text-center mt-2 mb-3 fw-bold text-danger">
          Enter Clock In Information
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              <Form.Label htmlFor="selectBox">Branch Code</Form.Label>
              <Form.Select
                id="selectBox"
                aria-label="Default select example"
                value={formData.branchCode}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    branchCode: e.target.value,
                  }))
                }
              >
                <option selected>Branch Code</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="selectBox">Branch:</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="store name"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label className="required">Brand:</Form.Label>
                <Select
                  options={options}
                  value={formData.brand}
                  onChange={(selectedOption) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      brand: selectedOption,
                    }))
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label className="required">Sales Type:</Form.Label>
                <Select
                  options={salesType}
                  value={formData.salesType}
                  onChange={(selectedOption) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      salesType: selectedOption,
                    }))
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label className="required">Product Type:</Form.Label>
                <Select
                  options={productType}
                  value={formData.productType}
                  onChange={(selectedOption) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      productType: selectedOption,
                    }))
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={!formData.brand || !formData.salesType || !formData.productType}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Attendance;
