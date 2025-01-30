import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  mainContainer: {
    minHeight: '100vh',
    padding: '50px 0',
  },
  introTextContainer: {
    width: '100%',
    margin: '20px 10px',
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.4rem',
    fontWeight: 500,  // Made text bolder
    lineHeight: '1.8',
    color: '#2c3e50',
    fontFamily: "'Poppins', sans-serif",
  },
  introImageContainer: {
    margin: '10px 0', // Reduced margin to make image closer to the title
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    '@media (max-width: 768px)': {
      order: 2, // Image below text on mobile
    },
    '@media (min-width: 769px)': {
      order: 1, // Image on right side on larger screens
    },
  },
  profileImage: {
    borderRadius: '20px',
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 30px 50px rgba(0,0,0,0.15)',
    }
  },
  contentContainer: {
    padding: '40px',
    margin: '-25px 0',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const aboutContent = `Hello! I'm Shripad, currently pursuing Computer Engineering at MIT Academy of Engineering. I'm a friendly and enthusiastic individual who loves to code and build interesting projects. When I'm not coding, you'll find me , playing chess (though I'm still learning), watching sitcoms (always up for TV show recommendations), reading books (particularly interested in technology and fiction), and building fun side projects. I'm passionate about technology and love working in team. I believe in collaborative learning and always try to bring positive energy to any group I work with. Whether it's a coding project or a chess match, I'm always eager to learn and improve! Let's connect and build something amazing together !`;

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  
    // Apply the background style to complete page
    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.backgroundRepeat = 'no-repeat';
  
    // Cleanup function
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.minHeight = '';
      document.body.style.margin = '';
      document.body.style.backgroundRepeat = '';
    };
  }, []);

  return (
    <div style={styles.mainContainer}>
      <Header title={header} />
      <div className="section-content-container">
        <Container style={styles.contentContainer}>
          {data ? (
            <Fade>
              <Row className="align-items-center">
                <Col xs={12} style={styles.introImageContainer}>
                  <img
                    src={data?.imageSource}
                    alt="profile"
                    style={styles.profileImage}
                    className="img-fluid"
                  />
                </Col>
                <Col xs={12} style={styles.introTextContainer}>
                  <ReactMarkdown>{aboutContent}</ReactMarkdown>
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </div>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;