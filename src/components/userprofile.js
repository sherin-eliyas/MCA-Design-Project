import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [UdepartmentDetails, setDepartmentDetails] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { Data, departmentDetails } = location.state;
  const [isApprovalEnabled, setApprovalEnabled] = useState(true);
  const [message, setMessage] = useState("");
  const [printRequested, setPrintRequested] = useState(false);

  useEffect(() => {
    const areAllDepartmentsApproved = () => {
      return departmentDetails.every((detail) => detail.status === "approved");
    };
    setApprovalEnabled(!areAllDepartmentsApproved());
    const uniqueDepartmentDetails = departmentDetails.filter(
      (detail, index, self) =>
        index ===
        self.findIndex((d) => d.department_name === detail.department_name)
    );

    // Update state with unique department details
    setDepartmentDetails(uniqueDepartmentDetails);
  }, [departmentDetails]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleAskForApproval = async () => {
    try {
      const response = await fetch(
        "https://ndm-backend.vercel.app/api/request-approval",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rollNumber: Data.roll_number,
            departmentDetails: departmentDetails,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Request for approval sent successfully.");
      } else {
        alert("Error sending request for approval:", data.message);
      }
    } catch (error) {
      alert("Error sending request for approval:", error);
    }
  };

  const handleShowDigitalPaper = () => {
    const areAllDepartmentsApproved = () => {
      return departmentDetails.every((detail) => detail.status === "approved");
    };

    if (areAllDepartmentsApproved()) {
      setMessage(
        "You are eligible to claim the certificate from the university!"
      );
      // Hide the "Show Digital Paper" button and show the "Print" button
      setPrintRequested(true);
    } else {
      setMessage("Please wait until all departments are approved.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AppContainer1>
      <div>
        <MarqueeText>
          {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
          <marquee>Welcome to No Due Management System(NDM).</marquee>
        </MarqueeText>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
        <h2
          style={{
            marginLeft: "1em",
          }}
        >
          Student <span style={{ color: "red" }}>Profile:</span>
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginLeft: "1em",
          }}
        >
          <img
            src={Data.photo_url}
            height="150px"
            width="150px"
            alt="User"
            style={{ borderRadius: "50%", border: "2px solid #3498db" }}
          />
          <div
            style={{
              borderRight: "1px solid #3498db",
              paddingRight: "20px",
            }}
          >
            <div style={{ marginLeft: "20px" }}>
              <p>
                <strong>Roll Number:</strong> {Data.roll_number}
              </p>
              <p>
                <strong>Student Name:</strong> {Data.student_name}
              </p>
              <p>
                <strong>Email id:</strong> {Data.email_id}
              </p>
            </div>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <p>
              <strong>Address:</strong> {Data.address}
            </p>
            <p>
              <strong>Contact Number:</strong> {Data.contact_number}
            </p>
            <p>
              <strong>School of Study:</strong> {Data.school_of_study}
            </p>
            <p>
              <strong>Year of Admission:</strong> {Data.year_of_admission}
            </p>
          </div>
        </div>

        <hr style={{ margin: "20px 0" }} />

        <h3
          style={{
            marginLeft: "1em",
          }}
        >
          No Due <span style={{ color: "red" }}>Details:</span>
        </h3>
        {departmentDetails && departmentDetails.length > 0 ? (
          <div
            style={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              marginLeft: "1em",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <p>
                <strong>Department:</strong>
              </p>
              <div style={{ marginRight: "20px" }}>
                <p>
                  <strong>Status:</strong>
                </p>
              </div>
            </div>

            {UdepartmentDetails.map((detail, index) => (
              <div key={index} style={{ marginRight: "20px" }}>
                <p>{detail.department_name}</p>
                <p>{detail.status}</p>
              </div>
            ))}

            {isApprovalEnabled ? (
              <ButtonContainer
                className="askApprovalButton"
                onClick={handleAskForApproval}
              >
                Ask for Approval
              </ButtonContainer>
            ) : (
              <>
                <ButtonContainer
                  className="showDigitalPaperButton"
                  onClick={handleShowDigitalPaper}
                  disabled={printRequested}
                >
                  Show Digital Paper
                </ButtonContainer>
                {printRequested && (
                  <ButtonContainer onClick={handlePrint}>Print</ButtonContainer>
                )}
              </>
            )}
          </div>
        ) : (
          <p>No department details available. Maybe you are detained</p>
        )}
        {message && <MessageContainer>{message}</MessageContainer>}
      </div>
    </AppContainer1>
  );
};

export default UserProfile;

const MarqueeText = styled.div`
  margin-top: 1em;
  width: 100%;
  overflow: hidden;
`;
const ButtonContainer = styled.button`
  margin-top: 20px;
  margin-left: 1rem;
  text-align: center;
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2c3e50; /* Change to your desired hover color */
  }
`;
const MessageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border-radius: 5px;
`;

const AppContainer1 = styled.div`
  color: white;
`;
