import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { adminDetails } = location.state;

  const handleLogout = () => {
    navigate("/");
  };

  const fetchApplicationData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://ndm-backend.vercel.app/api/application-data"
      );
      const data = await response.json();
      // console.log(data);

      if (data.success) {
        setApplicationData(data.applicationData);
      } else {
        notifyError("Error fetching application data");
      }
    } catch (error) {
      console.error("Error fetching application data:", error);
    }
  }, []);

  const fetchPendingRequests = useCallback(async () => {
    try {
      const response = await fetch(
        "https://ndm-backend.vercel.app/api/pending-requests"
      );
      const data = await response.json();

      if (data.success) {
        const filteredRequests = data.requests.filter(
          (request) => request.department_name === adminDetails.department
        );
        setPendingRequests(filteredRequests);
      } else {
        notifyError("Error fetching application data");
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  }, [adminDetails]);

  const handleApproveapp = async (id, type, applicationData) => {
    try {
      const response = await fetch(
        "https://ndm-backend.vercel.app/api/insert-student-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();

      if (data.success) {
        notifyError("Student details inserted successfully.");
        fetchApplicationData();
      } else {
        notifyError(data.message.error.detail);
      }
    } catch (error) {
      console.error("Error approving student:", error);
    }
  };

  const handleDenyapp = async (id) => {
    try {
      const response = await fetch(
        `https://ndm-backend.vercel.app/api/deny-requestapp/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        notifyError("Denied Successfully");
        fetchPendingRequests();
      } else {
        notifyError(data.message.error.detail);
      }
    } catch (error) {
      notifyError("Error denying request");
    }
  };

  const handleApprove = async (id, type, applicationData, department_name) => {
    try {
      const response = await fetch(
        "https://ndm-backend.vercel.app/api/approve-request/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, applicationData, department_name }),
        }
      );

      const data = await response.json();

      if (data.success) {
        notifyError(data.message);
        fetchPendingRequests();
      } else {
        notifyError(data.message.error.detail);
      }
    } catch (error) {
      console.error("Error approving student:", error);
    }
  };

  const handleDeny = async (id, applicationData, department_name) => {
    try {
      const response = await fetch(
        `https://ndm-backend.vercel.app/api/approve-deny`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, applicationData, department_name }),
        }
      );
      const data = await response.json();
      if (data.success) {
        notifyError("Denied Successfully");
        fetchPendingRequests();
      } else {
        notifyError(data.message.error.detail);
      }
    } catch (error) {
      console.error("Error denying request:", error);
    }
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const groupRequestsByRollNumber = useCallback(() => {
    const groupedRequests = {};
    pendingRequests.forEach((request) => {
      const { roll_number } = request;
      if (!groupedRequests[roll_number]) {
        groupedRequests[roll_number] = [];
      }
      const existingRequest = groupedRequests[roll_number].find(
        (existing) => existing.department_name === request.department_name
      );
      if (!existingRequest) {
        groupedRequests[roll_number].push(request);
      }
    });
    return groupedRequests;
  }, [pendingRequests]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await Promise.all([fetchApplicationData(), fetchPendingRequests()]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchApplicationData, fetchPendingRequests]);

  const filteredApplicationData = applicationData.filter(
    (app) =>
      !pendingRequests.some((request) => request.rollNumber === app.roll_number)
  );

  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div>
              <ToastContainer />
              <button
                className="logoutButton"
                style={{
                  background: "#3498db",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  marginTop: "10px",
                  marginRight: "rem",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
              <h2
                style={{
                  color: "white",
                  marginTop: "20px",
                  marginLeft: "1rem",
                }}
              >
                Welcome{" "}
                <span style={{ color: "red" }}>{adminDetails.department}</span>
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  marginLeft: "1rem",
                }}
              >
                <div style={{ flexBasis: "48%" }}>
                  <h2 style={{ color: "white" }}>
                    Applications <span style={{ color: "red" }}>received:</span>
                  </h2>
                  <ul>
                    {filteredApplicationData.map((app, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "10px",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          background: "#f9f9f9",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>{app.email_id}</div>
                        <div>
                          <button
                            style={{
                              background: "#2ecc71",
                              color: "#fff",
                              padding: "5px 10px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                            onClick={() =>
                              handleApproveapp(
                                app.id,
                                "application",
                                app.rollNumber
                              )
                            }
                          >
                            Approve
                          </button>
                          <button
                            style={{
                              background: "#e74c3c",
                              color: "#fff",
                              padding: "5px 10px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDenyapp(app.id)}
                          >
                            Deny
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    borderLeft: "2px solid #000",
                    height: "100%",
                    margin: "0 10px",
                  }}
                ></div>

                <div style={{ flexBasis: "48%" }}>
                  <h2 style={{ color: "white" }}>
                    Pending <span style={{ color: "red" }}>Requests:</span>
                  </h2>
                  {Object.entries(groupRequestsByRollNumber()).map(
                    ([rollNumber, requests]) => (
                      <div
                        key={rollNumber}
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        <h3>{`Roll Number: ${rollNumber}`}</h3>
                        <ul>
                          {requests.map((request) => (
                            <li
                              key={request.id}
                              style={{
                                marginBottom: "10px",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                background: "#f9f9f9",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div>{request.department_name}</div>
                              <div>
                                <button
                                  style={{
                                    background: "#2ecc71",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginRight: "5px",
                                  }}
                                  onClick={() =>
                                    handleApprove(
                                      request.id,
                                      "request",
                                      parseInt(rollNumber),
                                      request.department_name
                                    )
                                  }
                                >
                                  Approve
                                </button>
                                <button
                                  style={{
                                    background: "#e74c3c",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleDeny(
                                      request.id,
                                      rollNumber,
                                      request.department_name
                                    )
                                  }
                                >
                                  Deny
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
