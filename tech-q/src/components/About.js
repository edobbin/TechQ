// About.js
import React from 'react';

const About = () => {

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
        <h1 style={{textAlign: 'center',}}>About TechQ</h1>
        <p>Welcome to TechQ, your trusted community for sharing and finding answers to all your technology-related questions. Our mission is to connect tech enthusiasts and learners to foster knowledge exchange and problem-solving.</p>
        <p>At TechQ, you can post questions, provide answers, and engage with a diverse community of experts and learners in various tech fields, from programming and web development to hardware and software troubleshooting.</p>
        <p>We are dedicated to providing a safe and respectful environment for all members to learn and grow. Join us in this exciting journey of curiosity, exploration, and tech discovery!</p>
    </section>
    
    </>
  );
};

export default About;
