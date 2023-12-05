//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Question from './components/Question';
import Contact from './components/Contact';
import UserProfile from './components/UserProfile'; // Imported UserProfile
import { AuthProvider } from './contexts/AuthContext';
import MyQuestions from './components/MyQuestions';
import Footer from './components/Footer'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/posted" element={<MyQuestions />} />
          <Route path="/about" element={<About />} />
          <Route path="/questions" element={<Question />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<UserProfile />} /> {/* Updated route */}
        </Routes>
        < Footer/>
      </Router>
    </AuthProvider>
  );
};

// function App() {
//   return <UserProfile />;
// }
export default App;
