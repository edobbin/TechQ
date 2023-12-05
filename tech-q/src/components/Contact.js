// Contact.js
import React from 'react';

const Contact = () => {

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
    <div style={sectionStyle}>
      <h1 style={{textAlign: 'center',}}>Contact Page</h1>
      <p>If you have questions, feedback, or need assistance, we're here to help. Please don't hesitate to reach out to us through the following channels:</p>
            <div>Email: <a href="mailto:contact@techq.com" style={{color: '#6200B3',}}>contact@techq.com</a></div>
            <div>Phone: +1 (123) 456-7890</div>
            <div>Address: 7800 York Rd, Towson, MD 21204</div>
        
    </div>
    <footer style={footerStyle}>
    <p>
      &copy; 2023 TechQ. All rights reserved. <a href="/about">About TechQ</a> |{' '}
      <a href="/contact">Contact Us</a>
        </p>
    </footer>
    </>
  );
};

export default Contact;
