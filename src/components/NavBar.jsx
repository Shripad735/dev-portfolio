import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const styles = {
  navbar: {
    background: 'rgba(33, 37, 41, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease-in-out',
    padding: '12px 20px',
  },
  logoStyle: {
    width: 50,
    height: 40,
    transition: 'all 0.3s ease-in-out',
  },
  togglerButton: {
    border: 'none',
    padding: '8px',
    borderRadius: '4px',
    transition: 'all 0.2s ease-in-out',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
};

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  font-size: 1rem;
  font-weight: 500;
  margin: 0 12px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  position: relative;
  padding: 5px 0;
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${(props) => props.theme.accentColor};
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

const InternalNavLink = styled(NavLink)`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  font-size: 1rem;
  font-weight: 500;
  margin: 0 12px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  position: relative;
  padding: 5px 0;
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${(props) => props.theme.accentColor};
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  &.navbar__link--active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
    &::after {
      width: 100%;
    }
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    ...styles.navbar,
    background: scrolled ? 'rgba(33, 37, 41, 0.95)' : 'rgba(33, 37, 41, 0.8)',
    padding: scrolled ? '8px 20px' : '12px 20px',
  };

  return (
    <Navbar
      fixed="top"
      expand="md"
      variant="dark"
      expanded={expanded}
      style={navbarStyle}
    >
      <Container style={styles.navContainer}>
        {data?.logo && (
          <Navbar.Brand href="/" style={{ padding: 0 }}>
            <img
              src={data?.logo?.source}
              className="d-inline-block align-top"
              alt="main logo"
              style={{
                ...styles.logoStyle,
                transform: scrolled ? 'scale(0.9)' : 'scale(1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = scrolled ? 'scale(1)' : 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = scrolled ? 'scale(0.9)' : 'scale(1)')}
            />
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          style={styles.togglerButton}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {data
              && data.sections?.map((section, index) => (section?.type === 'link' ? (
                <ExternalNavLink
                  key={section.title}
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setExpanded(false)}
                  className="navbar__link"
                  theme={theme}
                >
                  {section.title}
                </ExternalNavLink>
              ) : (
                <InternalNavLink
                  key={section.title}
                  onClick={() => setExpanded(false)}
                  exact={index === 0}
                  activeClassName="navbar__link--active"
                  className="navbar__link"
                  to={section.href}
                  theme={theme}
                >
                  {section.title}
                </InternalNavLink>
              )))}
          </Nav>
          {/* <ThemeToggler
            onClick={() => setExpanded(false)}
          /> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;