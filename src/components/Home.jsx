import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: 'clamp(2.5em, 8vw, 5em)', // Responsive font size
    fontWeight: '700',
    background: 'linear-gradient(45deg, #2c3e50, #3498db)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '-0.02em',
    animation: 'fadeIn 1s ease-in',
  },
  inlineChild: {
    display: 'inline-block',
    fontSize: 'clamp(1.5em, 4vw, 2em)',
    color: '#2c3e50',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '500',
  },
  mainContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  typewriterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  socialContainer: {
    marginTop: '40px',
    animation: 'slideUp 0.8s ease-out forwards',
    opacity: '0',
    transform: 'translateY(20px)',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes slideUp': {
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
};

function Home() {
  const [data, setData] = useState(null);
  const roles = [
    "Student",
    "Fullstack Developer",
    "Cloud Enthusiast",  
  ];

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));

    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideUp {
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>Shripad Khandare</h1>
        <div style={styles.typewriterContainer}>
          <h2 style={styles.inlineChild}>I'm</h2>
          <div style={{ ...styles.inlineChild, color: '#3498db' }}>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: roles,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
        </div>
        <div style={styles.socialContainer}>
          <Social />
        </div>
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;