import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import LogoImage from "../asset/4.png";
import bg from "../asset/bg1.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  // background-image: url(${bg});
  background-size: cover;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px; /* Increasing label font size */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px; /* Adjusting input padding */
  margin-bottom: 20px;
  border: 2px solid #3498db;
  border-radius: 5px;
  font-size: 16px; /* Increasing input font size */
`;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 12px 20px; /* Adjusting button padding */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const MarqueeText = styled.div`
  margin-top: 1em;
  width: 100%;
  overflow: hidden;
`;

const FormsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 1rem;
  width: 100%;
  height: auto;
`;

const Logo = styled.img`
  max-width: 100px;
  // margin-bottom: 20px;
`;
const Logo1 = styled.img`
  max-width: 50px;
`;
const Login = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [schoolOfStudy, setSchoolOfStudy] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Form submitted");
    setErrorMessage("");
    const rollNumberPattern = /^[0-9]{8}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!rollNumberPattern.test(rollNumber)) {
      setErrorMessage(
        <div>
          Please enter a valid roll number.
          <br />
          It should be of 8 digits.
          <br />
          It should not contain any special characters.
        </div>
      );

      return;
    }
    if (!passwordPattern.test(password)) {
      setErrorMessage(
        <div>
          Password must meet the specified criteria.
          <br />
          Password contains at least one uppercase letter,
          <br />
          one lowercase letter,
          <br />
          one digit, and one special character.
          <br />
          Password length should be between 6 to 12.
        </div>
      );

      return;
    }
    fetch("https://ndm-backend.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rollNumber, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          if (data.isAdmin === true) {
            // console.log(data);
            navigate("/admin", {
              state: {
                adminDetails: data,
              },
            });
          } else {
            navigate("/user-profile", {
              state: {
                Data: data.user,
                departmentDetails: data.departmentDetails,
              },
            });
          }
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        setErrorMessage("Sometimes went wrong");
      });
  };

  const handleRegistrationSubmit = () => {
    setErrorMessage("");
    if (
      !rollNumber ||
      !password ||
      !name ||
      !photoURL ||
      !schoolOfStudy ||
      !admissionYear ||
      !address ||
      !contactNumber ||
      !email
    ) {
      setErrorMessage("All fields are required.");
      return;
    }
    const rollNumberPattern = /^[0-9]{8}$/;
    if (!rollNumberPattern.test(rollNumber)) {
      setErrorMessage(
        <div>
          Please enter a valid roll number.
          <br />
          It should be of 8 digits.
          <br />
          It should not contain any special characters.
        </div>
      );
      return;
    }
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage(
        <div>
          Password must meet the specified criteria.
          <br />
          Password contains at least one uppercase letter,
          <br />
          one lowercase letter,
          <br />
          one digit, and one special character.
          <br />
          Password length should be between 6 to 12.
        </div>
      );
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(contactNumber)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    const details = {
      rollNumber,
      password,
      name,
      photoURL,
      schoolOfStudy,
      admissionYear,
      address,
      contactNumber,
      email,
    };
    // console.log(details);
    fetch("https://ndm-backend.vercel.app/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert(
            "Registered successfully admin have to Approval the Registration"
          );
          navigate("/");
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred while processing your request.");
      });
  };

  const handleAdminContact = async () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };
  const handlelogin = async () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MarqueeText>
            <marquee>Welcome to No Due Management System(NDM).</marquee>
          </MarqueeText>
          <Overlay>
            <Container>
              {showLoginForm ? (
                <>
                  <Form onSubmit={handleSubmit}>
                    <Logo src={LogoImage} alt="Logo" />

                    <h2>
                      Login <span>Page</span>
                    </h2>
                    <Label>
                      Roll Number:<span>&#9733;</span>
                    </Label>
                    <Input
                      type="text"
                      name="rollnumber"
                      placeholder="Roll Number..."
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                    <Label>
                      Password:<span>&#9733;</span>
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                    <Button type="button" onClick={handleSubmit}>
                      Login
                    </Button>
                  </Form>
                  <br />
                  <a
                    href="#"
                    onClick={handleAdminContact}
                    style={{ color: "black" }}
                  >
                    If you don't have a Roll Number and Password? Click here to
                    contact admin.
                  </a>
                </>
              ) : (
                <>
                  {" "}
                  <FormsContainer>
                    <Form onSubmit={handleRegistrationSubmit}>
                      <Logo1 src={LogoImage} alt="Logo" />
                      <h2>
                        Registration <span>Form</span>
                      </h2>
                      <Label>
                        Roll Number:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="text"
                        name="rollnumber"
                        placeholder="Roll Number..."
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                      />
                      <Label>
                        Password:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Label>
                        Name:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Label>
                        Photo URL:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="text"
                        name="photoURL"
                        placeholder="Photo URL..."
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                      />
                    </Form>
                    <Form>
                      <Label>
                        School of Study:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="text"
                        name="schoolOfStudy"
                        placeholder="School of Study..."
                        value={schoolOfStudy}
                        onChange={(e) => setSchoolOfStudy(e.target.value)}
                      />
                      <Label>
                        Year of Admission:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="text"
                        name="admissionYear"
                        placeholder="Year of Admission..."
                        value={admissionYear}
                        onChange={(e) => setAdmissionYear(e.target.value)}
                      />
                      <Label>
                        Address:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="text"
                        name="address"
                        placeholder="Address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <Label>
                        Contact Number:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number..."
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                      <Label>
                        Email:<span>&#9733;</span>
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                      <Button type="button" onClick={handleRegistrationSubmit}>
                        Register
                      </Button>
                    </Form>
                  </FormsContainer>
                  <br />
                  <a href="#" onClick={handlelogin} style={{ color: "black" }}>
                    If you already have a Roll Number and Password? Click here.
                  </a>
                </>
              )}
            </Container>
          </Overlay>
        </>
      )}
    </>
  );
};

export default Login;
