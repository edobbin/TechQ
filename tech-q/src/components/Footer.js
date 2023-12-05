import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
function Footer() {
    
    
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
    <p>&copy; 2023 TechQ. All rights reserved. <NavLink to="/privacy">Privacy Policy</NavLink> | <NavLink to="/terms">Terms of Service</NavLink></p>
    </footer></div>
  )
}

export default Footer