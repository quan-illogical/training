import React, { useState } from "react";
import { Navbar, Form, Container, Row, Col } from "react-bootstrap";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import profile_photo from "../images/meme-doge.jpg";
import FormButtonFill from "../components/FormButtonFill";
import FormButtonOutline from "../components/FormButtonOutline";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NameValidator from "../services/NameValidator";
import EmailValidator from "../services/EmailValidator";
import PhoneValidator from "../services/PhoneValidator";
import PasswordValidator from "../services/PasswordValidator";

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(true);
  const [validated, setValidated] = useState(false);

  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  const userPhone = localStorage.getItem("phone");

  const handleChange = (e, dispatchType) => {
    dispatch({
      type: dispatchType,
      payload: e.target.value,
    });
    if (
      NameValidator({ str: user.name }) &&
      EmailValidator({ str: user.email }) &&
      PhoneValidator({ input: user.phone }) &&
      PasswordValidator({ input: user.currentPassword }) &&
      PasswordValidator({ input: user.newPassword }) &&
      PasswordValidator({ input: user.confirmPassword })
    ) {
      setDisabled(false);
    } else setDisabled(true);
  };

  const handleOutlineClick = () => {
    localStorage.clear();
    history.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = user;
    setValidated(true);

    if (
      user.name !== userName &&
      user.email !== userEmail &&
      user.phone !== userPhone
    ) {
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

      console.log(res);
    }
    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== ""
    ) {
      if (newPassword === confirmPassword) {
        const res = await axios({
          method: "post",
          url: process.env.REACT_APP_CHANGE_PASSWORD,
          data: {
            password: newPassword,
            currentPassword: currentPassword,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (res.status === 1) {
          alert("Successfully changed password");
        } else alert("Wrong password");
        console.log(res);
      } else {
        alert("New password and confirm password must match");
      }
    }
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
            <h1>{userName || null}</h1>
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
                defaultValue={userName}
              />
            </Col>
          </Row>

          <Row noGutters={true}>
            <Col xl={6}>
              <EmailInput
                className="profile-input"
                className_label="profile-input-label"
                onChange={(e) => handleChange(e, "PROFILE-EMAIL")}
                defaultValue={userEmail}
              />
            </Col>
            <Col xl={6}>
              <TextInput
                className="profile-input"
                className_label="profile-input-label"
                label="Phone"
                placeholder="Enter your phone"
                onChange={(e) => handleChange(e, "PROFILE-PHONE")}
                defaultValue={userPhone}
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
            <FormButtonOutline
              onClick={() => handleOutlineClick()}
              type="button"
              content="Log out"
              class="btn-profile-outline"
            />
          </div>
        </Container>
      </Form>
    </div>
  );
}
