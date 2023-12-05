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

  

  return (
    <>
    <div style={sectionStyle}>
      <h1 style={{textAlign: 'center',}}>Contact Page</h1>
      <p>If you have questions, feedback, or need assistance, we're here to help. Please don't hesitate to reach out to us through the following channels:</p>
            <div>Email: <a href="mailto:contact@techq.com" style={{color: '#6200B3',}}>contact@techq.com</a></div>
            <div>Phone: +1 (123) 456-7890</div>
            <div>Address: 7800 York Rd, Towson, MD 21204</div>
        
    </div>
    
    </>
  );
};

export default Contact;
