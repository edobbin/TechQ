import React from 'react'

function Footer() {
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
    <div><footer style={footerStyle}>
    <p>&copy; 2023 TechQ. All rights reserved. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
    </footer></div>
  )
}

export default Footer