import React from "react";
import { Navbar, Form, Container, Row, Col } from "react-bootstrap";
import ProfileTextInput from "../components/Profile/ProfileTextInput";
import ProfileEmailInput from "../components/Profile/ProfileEmailInput";
import ProfilePasswordInput from "../components/Profile/ProfilePasswordInput";
import profile_photo from "../images/meme-doge.jpg";
import FormButtonFill from "../components/FormButtonFill";
import FormButtonOutline from "../components/FormButtonOutline";
import {useSelector, useDispatch} from "react-redux"

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

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
            <div onClick={()=>{console.log("Hey")}}></div>
            <h1>{ user.name || "LOADING..."}</h1>
          </div>

          <Row noGutters={true}>
            <Col xl={6}>
              <ProfileTextInput
                label="Full name"
                placeholder="Enter your full name"
                dispatchType="PROFILE-NAME"
                defaultValue={user.name}
              />
            </Col>
          </Row>

          <Row noGutters={true}>
            <Col xl={6}>
              <ProfileEmailInput dispatchType="PROFILE-EMAIL" defaultValue={user.email} />
            </Col>
            <Col xl={6}>
              <ProfileTextInput label="Phone" placeholder="Enter your phone" dispatchType="PROFILE-PHONE" defaultValue={user.phone} />
            </Col>
          </Row>
          {/* END section 1 */}
          
          {/* Section divider */}
          <Row noGutters={true}>
            <Col xl={12} >
              <div className="section-divider">Change password</div>
            </Col>
          </Row>
          {/* Section divider */}

          {/* START section 2 (Password change) */}

          <Row noGutters={true}>
            <Col xl={6}>
              <ProfilePasswordInput
                label="Current password"
                placeholder="Enter your password"
                dispatchType="PROFILE-CURRENT-PASSWORD"
              />
            </Col>
          </Row>

          <Row noGutters={true}>
            <Col xl={6}>
              <ProfilePasswordInput label="New password" placeholder="Enter your new password" dispatchType="PROFILE-NEW-PASSWORD" />
            </Col>
            <Col xl={6}>
              <ProfilePasswordInput label="Confirm password" placeholder="Enter your password" dispatchType="PROFILE-CONFIRM-PASSWORD" />
            </Col>
          </Row>
          {/* END section 2 */}

          <div className="form-buttons">
            <FormButtonFill content="Save" class="btn-profile-fill"/>
            <FormButtonOutline content="Log out"class="btn-profile-outline"/>
          </div>

        </Container>
      </Form>
    </div>
  );
}
