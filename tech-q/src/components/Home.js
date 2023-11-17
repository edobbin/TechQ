// Home.js
import React from 'react';
import AnswerComponent from './AnswerComponent'

const Home = () => {

  const sectionStyle = {
    padding: '2%',
    paddingTop: '5%',
    alignItema: 'center',
    maxWidth: '75%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    margin: '0 auto',
  };

  const footerStyle = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    backgroundColor: '#6200B3',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    marginTop: 'auto',
  }

return (
  <>
  <section style={sectionStyle}>
    <h1 style={{textAlign: 'center',}}>Home Page</h1>
    <AnswerComponent content="Some answer content" user="Jane Doe" points={5} answerId={1} />
  </section>
  <footer style={footerStyle}>
  <p>&copy; 2023 TechQ. All rights reserved. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
  </footer>
  </>
  
)
};

export default Home;
