import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Media, Row, Col, Container, Alert } from 'reactstrap';
import PostList from './posts/PostList';
import { GoogleLogin } from 'react-google-login';
import config from '../config.js';
import MyPlaceBird from '../images/bird.png';

var imgStyle = {
  maxWidth: "85px",
};
export default function App(props){

  const [loginMessage, setLoginMessage] = useState(null);
  
  const responseGoogleSuccess = (googleUser) => {
    var profile = googleUser.getBasicProfile(); //With this we create a session

    sessionStorage.setItem('name', profile.getName()); //With this we will have tehe as properties so we would be able to catch them later
    sessionStorage.setItem('email', profile.getEmail());
    sessionStorage.setItem('image', profile.getImageUrl());
    
    props.history.push("/home");
  }

  const responseGoogleFailure = (response) => {
    setLoginMessage(<Alert color="danger">Inicio de sesión incorrecto. Inténtelo de nuevo</Alert>);
  }

  return(
    <Container>
      <Row>
        <Col>
          <Navbar color="primary" light expand="md">
          <Media style={imgStyle} object src={MyPlaceBird} alt="Bird"/><NavbarBrand><h4 className="text-white">Spicy Twitter</h4></NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {loginMessage}
                <GoogleLogin
                  clientId={config.clientID} //Here comes MY OWN GOOGLE ID on google developers webpage
                  buttonText="Login with Google"
                  theme='dark'
                  onSuccess={responseGoogleSuccess}
                  onFailure={responseGoogleFailure}
                />
              </NavItem>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col xs= "12">
          <PostList/>
        </Col>
      </Row>
    </Container>
  );
}
