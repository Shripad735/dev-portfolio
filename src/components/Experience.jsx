import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

const styles = {
  mainContainer: {
    minHeight: '100vh',
    padding: '50px 0',
  },
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
    fontSize: '1.1rem',
    color: '#2c3e50',
    lineHeight: '1.6',
  },
  subtitleContainerStyle: {
    marginTop: 15,
    marginBottom: 15,
  },
  subtitleStyle: {
    display: 'inline-block',
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  inlineChild: {
    display: 'inline-block',
    fontSize: '1.1rem',
    color: '#7f8c8d',
  },
  timelineItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '2em',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    margin: '20px 0',
  },
  itemTitle: {
    fontSize: '1.8rem',
    fontWeight: 600,
    color: '#2c3e50',
    marginBottom: '10px',
    fontFamily: "'Poppins', sans-serif",
    transition: 'all 0.3s ease-in-out',
  },
  dateStyle: {
    background: (theme) => theme.accentColor,
    fontSize: '1.1rem',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#fff',
    backdropFilter: 'blur(5px)',
}
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  
    // Apply consistent background
    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
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
              <Timeline lineColor={theme.timelineLineColor}>
                {data.map((item) => (
                  <Fade key={item.title + item.dateText}>
                    <TimelineItem
                      dateText={item.dateText}
                      dateInnerStyle={{ 
                        background: theme.accentColor,
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        padding: '8px 16px',
                        borderRadius: '20px',
                      }}
                      style={styles.itemStyle}
                      bodyContainerStyle={{ color: theme.color }}
                    >
                      <h2 className="item-title" style={{
                        fontSize: '1.8rem',
                        fontWeight: 600,
                        color: '#2c3e50',
                        marginBottom: '10px',
                      }}>
                        {item.title}
                      </h2>
                      <div style={styles.subtitleContainerStyle}>
                        <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                          {item.subtitle}
                        </h4>
                        {item.workType && (
                          <h5 style={styles.inlineChild}>
                            &nbsp;·&nbsp;{item.workType}
                          </h5>
                        )}
                      </div>
                      <ul style={styles.ulStyle}>
                        {item.workDescription.map((point) => (
                          <div key={point}>
                            <li>
                              <ReactMarkdown
                                children={point}
                                components={{
                                  p: 'span',
                                }}
                              />
                            </li>
                            <br />
                          </div>
                        ))}
                      </ul>
                    </TimelineItem>
                  </Fade>
                ))}
              </Timeline>
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </div>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
