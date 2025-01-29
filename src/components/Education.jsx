import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    const handleResize = () => {
      if (window.innerWidth < 576) {
        setMode('VERTICAL');
        setWidth('90vw');
      } else if (window.innerWidth < 768) {
        setWidth('90vw');
      } else if (window.innerWidth < 1024) {
        setWidth('75vw');
      } else {
        setWidth('50vw');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.backgroundRepeat = 'no-repeat';

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.background = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.minHeight = '';
      document.body.style.margin = '';
      document.body.style.backgroundRepeat = '';
    };
  }, []);

  return (
    <div className="main-container">
      <Header title={header} />
      {data ? (
        <Fade>
          <div style={{ width }} className="section-content-container">
            <Container className="timeline-container">
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                items={data.education}
                cardHeight={250}
                mode={mode}
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.accentColor,
                  cardBgColor: 'rgba(255, 255, 255, 0.9)',
                  cardForeColor: '#2c3e50',
                  titleColor: '#2c3e50',
                }}
                classNames={{
                  card: 'education-card',
                  cardTitle: 'education-card-title',
                  cardSubTitle: 'education-card-subtitle',
                  cardText: 'education-card-text'
                }}
              >
                <div className="chrono-icons">
                  {data.education.map((education) => (
                    education.icon ? (
                      <img
                        key={education.icon.src}
                        src={education.icon.src}
                        alt={education.icon.alt}
                      />
                    ) : null
                  ))}
                </div>
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </div>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;