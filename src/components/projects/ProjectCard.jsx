import React, { useContext } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    margin: 5,
    borderRadius: '15px',
    fontWeight: 500,
    fontSize: '0.9rem',
    transition: 'all 0.3s ease-in-out',
  },
  cardStyle: {
    borderRadius: 15,
    border: 'none',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitleStyle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '15px',
    fontFamily: "'Poppins', sans-serif",
    color: '#2c3e50',
  },
  cardTextStyle: {
    textAlign: 'left',
    fontSize: '1.1rem',
    color: '#34495e',
    lineHeight: '1.6',
  },
  buttonStyle: {
    margin: 5,
    padding: '8px 20px',
    borderRadius: '20px',
    fontWeight: 500,
    transition: 'all 0.3s ease-in-out',
  },
  cardImageStyle: {
    height: '200px',
    objectFit: 'cover',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  cardBodyStyle: {
    padding: '1.5rem',
    flex: '1 1 auto',
  },
  cardFooterStyle: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid rgba(0,0,0,0.1)',
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        }}
      >
        {project?.image && (
          <Card.Img 
            variant="top" 
            src={project.image} 
            style={styles.cardImageStyle}
          />
        )}
        <Card.Body style={styles.cardBodyStyle}>
          <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(project.bodyText)}
          </Card.Text>
        </Card.Body>
  
        <Card.Body>
          {project?.links?.map((link) => (
            <Button
              key={link.href}
              style={styles.buttonStyle}
              variant={'outline-' + theme.bsSecondaryVariant}
              onClick={() => window.open(link.href, '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {link.text}
            </Button>
          ))}
        </Card.Body>
        {project.tags && (
          <Card.Footer style={{
            ...styles.cardFooterStyle,
            backgroundColor: theme.cardFooterBackground
          }}>
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={theme.bsSecondaryVariant}
                text={theme.bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
