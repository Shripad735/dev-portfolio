import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  mainContainer: {
    minHeight: '100vh',
    padding: '50px 0',
  },
  iconStyle: {
    height: 80,
    width: 80,
    margin: '15px',
    marginBottom: '10px',
    transition: 'all 0.3s ease-in-out',
    filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))',
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '#2c3e50',
    fontFamily: "'Poppins', sans-serif",
    marginBottom: '40px',
    padding: '0 20px',
  },
  skillSection: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  skillTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '25px',
    fontFamily: "'Poppins', sans-serif",
  },
  skillItem: {
    display: 'inline-block',
    margin: '10px',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
  },
  skillName: {
    marginTop: '8px',
    fontSize: '1.1rem',
    color: '#34495e',
    fontWeight: '500',
  }
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    // Apply consistent background
    document.body.style.background = 'linear-gradient(135deg, #e8eaef 0%,rgb(214, 218, 227) 100%)';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.backgroundRepeat = 'no-repeat';

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
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {renderSkillsIntro(data.intro)}
              {data.skills?.map((rows) => (
                <div key={rows.title} style={styles.skillSection}>
                  <h3 style={styles.skillTitle}>{rows.title}</h3>
                  {rows.items.map((item) => (
                    <div 
                      key={item.title} 
                      style={styles.skillItem}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.querySelector('img').style.filter = 'drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.2))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.querySelector('img').style.filter = 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))';
                      }}
                    >
                      <img
                        style={styles.iconStyle}
                        src={item.icon}
                        alt={item.title}
                      />
                      <p style={styles.skillName}>{item.title}</p>
                    </div>
                  ))}
                </div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </div>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;