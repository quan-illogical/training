import React from "react";
import { Navbar, Form, Container, Row, Col } from "react-bootstrap";
import ProfileTextInput from "../components/Profile/ProfileTextInput";
import ProfileEmailInput from "../components/Profile/ProfileEmailInput";

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
        <Container>
          <Row noGutters={true}>
            <Col xl>
              <ProfileTextInput />
            </Col>
            <Col xl>
              <ProfileEmailInput />
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
