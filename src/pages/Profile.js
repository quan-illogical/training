import React, {useState} from "react";
import { Navbar, Form, Container, Row, Col } from "react-bootstrap";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import profile_photo from "../images/meme-doge.jpg";
import FormButtonFill from "../components/FormButtonFill";
import FormButtonOutline from "../components/FormButtonOutline";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted!")
  }


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
            <h1>{user.name || "LOADING..."}</h1>
          </div>

          <Row noGutters={true}>
            <Col xl={6}>
              <TextInput
                className="profile-input"
                className_label="profile-input-label"
                label="Full name"
                placeholder="Enter your full name"
                dispatchType="PROFILE-NAME"
                defaultValue={user.name}
              />
            </Col>
          </Row>

          <Row noGutters={true}>
            <Col xl={6}>
              <EmailInput
                className="profile-input"
                className_label="profile-input-label"
                dispatchType="PROFILE-EMAIL"
                defaultValue={user.email}
              />
            </Col>
            <Col xl={6}>
              <TextInput
                className="profile-input"
                className_label="profile-input-label"
                label="Phone"
                placeholder="Enter your phone"
                dispatchType="PROFILE-PHONE"
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
          {/* Section divider */}

          {/* START section 2 (Password change) */}

          <Row noGutters={true}>
            <Col xl={6}>
              <PasswordInput
                className="profile-input"
                className_label="profile-input-label"
                label="Current password"
                placeholder="Enter your password"
                dispatchType="PROFILE-CURRENT-PASSWORD"
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
                dispatchType="PROFILE-NEW-PASSWORD"
              />
            </Col>
            <Col xl={6}>
              <PasswordInput
                className="profile-input"
                className_label="profile-input-label"
                label="Confirm password"
                placeholder="Enter your password"
                dispatchType="PROFILE-CONFIRM-PASSWORD"
              />
            </Col>
          </Row>
          {/* END section 2 */}

          <div className="form-buttons">
            <FormButtonFill onClick={(e)=>handleSubmit(e)} type="submit" disabled = {disabled} content="Save" class="btn-profile-fill" />
            <FormButtonOutline content="Log out" class="btn-profile-outline" />
          </div>
        </Container>
      </Form>
    </div>
  );
}
