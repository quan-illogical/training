import React from "react";
import { Navbar, Form, Container, Row, Col } from "react-bootstrap";
import ProfileTextInput from "../components/Profile/ProfileTextInput";
import ProfileEmailInput from "../components/Profile/ProfileEmailInput";
import ProfilePasswordInput from "../components/Profile/ProfilePasswordInput";
import profile_photo from "../images/meme-doge.jpg";

export default function Profile() {
  return (
    <div>
      <Navbar bsPrefix="profile-navbar" variant="dark">
        <div>
          <h1>My Profile</h1>
          <p>Manage your profile and contact information</p>
        </div>
      </Navbar>

      <Form className="form">
        <Container bsPrefix="container">
          <div className="profile-container">
            <img
              src={profile_photo}
              alt="Profile"
              className="rounded-circle profile-pic"
            />
            <h1>Mr. doge</h1>
          </div>
          <ProfileTextInput label="Full name" placeholder="Enter your full name" />
          <Row noGutters={true}>
            <Col xl>
              <ProfileEmailInput />
            </Col>
            <Col xl>
              <ProfileTextInput label="Phone" placeholder="Enter your phone" />
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
