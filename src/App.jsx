
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';

const App = () => {
  //We want to declare the "user" state in the App component - This way, we make the user's authentication status accessible throughout the application --> NOTE: This central management allows us to easily pass the "user" state down to components that need it
  const [user, setUser] = useState(null);

  return (
    <>
      <NavBar user={user} />
      <Routes>
        {/* NOTE: Simple conditional rendering of one of the landing pages using the Route that each component is located at - Here, we are using the existence of the a user state with a ternary */}
        {user ? (
          <Route path='/' element={<Dashboard user={user} />} />
        ) : (
          <Route path='/' element={<Landing />} />
        )}
        <Route path='signup' element={<SignupForm setUser={setUser}/>} />
      </Routes>
    </>
  )
}

export default App;
