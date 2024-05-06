import "./App.css";
import { Link } from "react-router-dom";
import Img from "./asset/img.png";
import Img3 from "./asset/1.jpg";
import styled from "styled-components";
import Img2 from "./asset/img2.png";
import Img1 from "./asset/2.jpg";
import React, { useState, useEffect } from "react";
import Loading from "./components/Loading";
import bg from "./asset/bg4.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const AppContainer1 = styled.div`
  background: rgb(52, 152, 219);
  background: radial-gradient(
    circle,
    rgba(52, 152, 219, 1) 7%,
    rgba(6, 68, 87, 1) 94%
  );
  color: white;
`;

const AppContainer = styled.div`
  background-image: url(${bg});
  background-size: cover;
  // filter: brightness(70%);
`;
const AboutUs = () => (
  <AppContainer1>
    <hr />
    <section id="about-us" className="App-section">
      <div className="container">
        <div className="about-us-content">
          <h2 style={{ color: "#fff" }}>
            About <span style={{ color: "red" }}>Us</span>
          </h2>
          <p>
            Welcome to the No Due Management System (NDM), where we strive to
            provide an efficient platform for managing and tracking dues with
            ease. Our user-friendly interface ensures a seamless experience, and
            we prioritize the security and reliability of our system. Feel free
            to explore and get started today!
          </p>
        </div>
        <center>
          <h2 style={{ color: "#fff" }}>
            "I'm
            <span style={{ color: "red" }}>Batman."</span>
          </h2>
        </center>
        <div className="team">
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <figure>
                  <blockquote class="blockquote">
                    <p>"I'm Batman."</p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>"I am vengeance. I am the night. I am Batman."</p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>"Swear to me!"</p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>
                      "It's not who I am underneath, but what I do that defines
                      me. "
                    </p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>"The world only makes sense if you force it to."</p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>"Yes, father. I shall become a bat."</p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>"Good grammar is essential, Robin."</p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>
                      "Criminals, by nature, are a cowardly and superstitious
                      lot."
                    </p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>"We all wear masks."</p>
                  </blockquote>
                  <blockquote class="blockquote">
                    <p>"I'm Rich"</p>
                  </blockquote>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppContainer1>
);

const Header = () => (
  <header className="App-header">
    <div className="container">
      <div className="header-content">
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item " data-bs-interval="2000">
              <img
                style={{ borderRadius: "50%", border: "2px solid #3498db" }}
                src={Img}
                alt="No Due Management System Logo"
                width="200px"
                height="200px"
                className="d-block w-0"
              />
            </div>
            <div className="carousel-item active" data-bs-interval="2000">
              <img
                style={{ borderRadius: "50%", border: "2px solid #3498db" }}
                src={Img3}
                alt="No Due Management System Logo"
                width="200px"
                height="200px"
                className="d-block w-0"
              />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img
                style={{ borderRadius: "50%", border: "2px solid #3498db" }}
                src={Img1}
                alt="No Due Management System Logo"
                width="200px"
                height="200px"
                className="d-block w-0"
              />
            </div>
          </div>
          {/* <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button> */}
        </div>

        <div className="header-text">
          <MarqueeText>
            {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
            <marquee>Welcome to No Due Management System(NDM).</marquee>
          </MarqueeText>
          <h1>No Due Management System</h1>
          <p>
            Efficiently manage and track dues with our user-friendly system.
          </p>
        </div>
      </div>
    </div>
  </header>
);

const Features = () => (
  <AppContainer>
    <section id="features" className="App-section">
      <div className="container">
        <div className="feature-content">
          <div className="feature-text">
            <h2>Key Features</h2>
            <ul>
              <li>Track dues and deadlines</li>
              <li>User-friendly interface</li>
              <li>Secure and reliable</li>
              <li>Easy integration</li>
            </ul>
          </div>
          <div className="feature-image">
            <img
              src={Img2}
              alt="No Due Management System Logo"
              width="200px"
              height="200px"
            />
          </div>
        </div>
      </div>
    </section>
  </AppContainer>
);

const CTA = () => (
  <section id="cta" className="App-section App-cta">
    <div className="container">
      <h2>Get Started Today</h2>
      <Link to="/login" className="login-btn">
        &#9755; Log In
      </Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="App-footer">
    <div className="container">
      <p>&copy; 2024 NDM by BMK</p>
    </div>
  </footer>
);

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Features />
          <CTA />
          <AboutUs />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
const MarqueeText = styled.div`
  margin-top: 1em;
  width: 100%;
  overflow: hidden;
`;
