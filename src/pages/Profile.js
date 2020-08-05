import React, { useState } from "react";
import { Navbar, Form, Container, Row, Col } from "react-bootstrap";
import {
  TextInput,
  EmailInput,
  PasswordInput,
  FormButtonFill,
  FormButtonOutline,
  UploadModal,
  Loading,
} from "../components";
import profile_photo from "../images/meme-doge.jpg";
import profile_btn from "../images/edit_photo.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  NameValidator,
  EmailValidator,
  PhoneValidator,
  PasswordValidator,
} from "../services";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userName = decoded.name;
  const userEmail = decoded.email;
  const userPhone = decoded.phone;
  const userPic = decoded.avatar;

  const handleOutlineClick = () => {
    localStorage.clear();
    history.push("/login");
  };

  const handleEditPhoto = async () => {
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { currentPassword, newPassword, confirmPassword } = user;

    if (
      user.name !== userName ||
      user.email !== userEmail ||
      user.phone !== userPhone
    ) {
      if (
        NameValidator({ str: user.name === "" ? userName : user.name }) &&
        EmailValidator({ str: user.email === "" ? userEmail : user.email }) &&
        PhoneValidator({ input: user.phone === "" ? userPhone : user.phone })
      ) {
        try {
          const res = await axios({
            method: "patch",
            url: process.env.REACT_APP_UPDATE,
            data: {
              name: user.name === "" ? userName : user.name,
              email: user.email === "" ? userEmail : user.email,
              phone: user.phone === "" ? userPhone : user.phone,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
          if (res.data.status === 1) {
            toast.success(
              "Personal infromation has been updated. Please login again to apply changes",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                  localStorage.clear()
                  history.go();
                },
              }
            );
          }
        } catch (error) {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== "" &&
      PasswordValidator({ input: user.newPassword })
    ) {
      try {
        if (newPassword === confirmPassword) {
          const res = await axios({
            method: "post",
            url: process.env.REACT_APP_CHANGE_PASSWORD,
            data: {
              password: newPassword,
              currentPassword: currentPassword,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
          if (res.data.status === 1) {
            toast.success("Successfully changed password", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => history.go(),
            });
          } else
            toast.error("Password is incorrect", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        } else {
          toast.error("New password and confirm password must match", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    setLoading(false);
  };

  return (
    <div>
      {loading ? <Loading /> : null}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UploadModal show={modal} onHide={() => setModal(false)} />
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
              src={userPic || profile_photo}
              alt="Profile"
              className="rounded-circle profile-pic"
            />
            <img
              onClick={handleEditPhoto}
              src={profile_btn}
              alt="Profile"
              className="profile-btn"
            />

            <h1>{userName || null}</h1>
          </div>

          <Row noGutters={true}>
            <Col xl={6}>
              <TextInput
                error={null}
                dispatchType="PROFILE-NAME"
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
                dispatchType="PROFILE-EMAIL"
                defaultValue={userEmail}
              />
            </Col>
            <Col xl={6}>
              <TextInput
                className="profile-input"
                className_label="profile-input-label"
                label="Phone"
                phone
                placeholder="Enter your phone"
                dispatchType="PROFILE-PHONE"
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

      <Form className="form">
        <Container bsPrefix="container">
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
            <FormButtonFill
              onClick={(e) => handleSubmit(e)}
              type="submit"
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
