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
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userName = decoded.name;
  const userEmail = decoded.email;
  const userPhone = decoded.phone;
  const userPic = decoded.avatar;

  const handleChange = (e, dispatchType) => {
    dispatch({
      type: dispatchType,
      payload: e.target.value,
    });
    if (
      (NameValidator({ str: user.name }) &&
        EmailValidator({ str: user.email }) &&
        PhoneValidator({ input: user.phone })) ||
      (PasswordValidator({ input: user.currentPassword }) &&
        PasswordValidator({ input: user.newPassword }) &&
        PasswordValidator({ input: user.confirmPassword }))
    ) {
      setDisabled(false);
    } else setDisabled(true);
  };

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
      user.name !== userName &&
      user.email !== userEmail &&
      user.phone !== userPhone
    ) {
      if (
        NameValidator({ str: user.name }) &&
        EmailValidator({ str: user.email }) &&
        PhoneValidator({ input: user.phone })
      ) {
        try {
          const res = await axios({
            method: "patch",
            url: process.env.REACT_APP_UPDATE,
            data: {
              name: user.name,
              email: user.email,
              phone: user.phone,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
          if (res.data.status === 1) {
            toast.success(res.data.msg, {
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
    }
    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== ""
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
              onClose: history.go()
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

      <Form className="form">
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
