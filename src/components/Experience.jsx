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

const CustomDate = ({ date }) => (
  <div className="date-inner">{date}</div>
);

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
    <div style={{ minHeight: '100vh', padding: '50px 0' }}>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              <Timeline lineColor={theme.timelineLineColor}>
                {data.map((item) => (
                  <Fade key={item.title + item.dateText}>
                    <TimelineItem
                      dateComponent={<CustomDate date={item.dateText} />}
                      style={{ margin: '20px 0' }}
                      bodyContainerStyle={{ color: theme.color }}
                    >
                      <h2 className="item-title">{item.title}</h2>
                      <div className="subtitle-container">
                        <h4 className="subtitle">{item.subtitle}</h4>
                        {item.workType && (
                          <h5 className="inline-child">
                            &nbsp;·&nbsp;{item.workType}
                          </h5>
                        )}
                      </div>
                      <ul className="experience-ul">
                        {item.workDescription.map((point) => (
                          <li key={point}>
                            <ReactMarkdown
                              children={point}
                              components={{
                                p: 'span',
                              }}
                            />
                          </li>
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