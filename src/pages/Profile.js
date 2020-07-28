import React, { useState } from "react";
import { Navbar, Form, Container, Row, Col } from "react-bootstrap";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import profile_photo from "../images/meme-doge.jpg";
import FormButtonFill from "../components/FormButtonFill";
import FormButtonOutline from "../components/FormButtonOutline";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(true);
  const [validated, setValidated] = useState(false);

  const handleChange = (e, dispatchType) => {
    dispatch({
      type: dispatchType,
      payload: e.target.value,
    });
    setDisabled(false);
  };

  const handleSubmit = async (e) => {
    const { currentPassword, newPassword, confirmPassword } = user;
    e.preventDefault();
    if (user.name !== "" && user.email !== "" && user.phone !== "") {
      const res = await axios({
        method: "patch",
        url: process.env.REACT_APP_UPDATE,
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      setValidated(true);
      if (
        currentPassword !== "" &&
        newPassword !== "" &&
        confirmPassword !== ""
      ) {
        // if (currentPassword === )
      }
      console.log(res);
    } else console.log("Submitted");
  };

  return (
    <div>
      <Navbar bsPrefix="profile-navbar" variant="dark">
        <div>
          <h1>My Profile</h1>
          <p>Manage your profile and contact information</p>
        </div>
      </Navbar>

      <Form noValidate validated={validated} className="form">
        <Container bsPrefix="container">
          {/* START section 1 (Profile info) */}

          <div className="profile-container">
            <img
              src={profile_photo}
              alt="Profile"
              className="rounded-circle profile-pic"
            />
            <div
              onClick={() => {
                console.log("Hey");
              }}
            ></div>
            <h1>{user.name || null}</h1>
          </div>

          <Row noGutters={true}>
            <Col xl={6}>
              <TextInput
                error={null}
                onChange={(e) => handleChange(e, "PROFILE-NAME")}
                className="profile-input"
                className_label="profile-input-label"
                label="Full name"
                placeholder="Enter your full name"
                defaultValue={user.name}
              />
            </Col>
          </Row>

          <Row noGutters={true}>
            <Col xl={6}>
              <EmailInput
                className="profile-input"
                className_label="profile-input-label"
                onChange={(e) => handleChange(e, "PROFILE-MAIL")}
                defaultValue={user.email}
              />
            </Col>
            <Col xl={6}>
              <TextInput
                className="profile-input"
                className_label="profile-input-label"
                label="Phone"
                placeholder="Enter your phone"
                onChange={(e) => handleChange(e, "PROFILE-PHONE")}
                defaultValue={user.phone}
              />
            </Col>
          </Row>
          {/* END section 1 */}

          {/* Section divider */}
          <Row noGutters={true}>
            <Col xl={12}>
              <div className="section-divider">Change password</div>
            </Col>
          </Row>
        </Container>
      </Form>
      {/* Section divider */}

      {/* START section 2 (Password change) */}

      <Form noValidate className="form">
        <Container bsPrefix="container">
          <Row noGutters={true}>
            <Col xl={6}>
              <PasswordInput
                className="profile-input"
                className_label="profile-input-label"
                label="Current password"
                placeholder="Enter your password"
                onChange={(e) => handleChange(e, "PROFILE-CURRENT-PASSWORD")}
              />
            </Col>
          </Row>

          <Row noGutters={true}>
            <Col xl={6}>
              <PasswordInput
                className="profile-input"
                className_label="profile-input-label"
                label="New password"
                placeholder="Enter your new password"
                onChange={(e) => handleChange(e, "PROFILE-NEW-PASSWORD")}
              />
            </Col>
            <Col xl={6}>
              <PasswordInput
                className="profile-input"
                className_label="profile-input-label"
                label="Confirm password"
                placeholder="Enter your password"
                onChange={(e) => handleChange(e, "PROFILE-CONFIRM-PASSWORD")}
              />
            </Col>
          </Row>
          {/* END section 2 */}

          <div className="form-buttons">
            <FormButtonFill
              onClick={(e) => handleSubmit(e)}
              type="submit"
              disabled={disabled}
              content="Save"
              class="btn-profile-fill"
            />
            <FormButtonOutline content="Log out" class="btn-profile-outline" />
          </div>
        </Container>
      </Form>
    </div>
  );
}
