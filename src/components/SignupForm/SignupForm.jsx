import * as authService from "../../services/authService";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const newUserResponse = await authService.signup(formData)
      props.setUser(newUserResponse.user); //Here, we are setting the state of "user" state variable to the actual user that signed-in --> We are returning the user object from the signup() fetch request function that we are importing from our authService.js file, so we can store it in the variable "newuserResponse" and access the user boject so we can use it in the state setter function for our "user" state in the App component
      navigate("/"); //Redirect to the Landing Page - Since "user" state will exist, the user will se the landing page reflecting that login-in status
    }catch(error){
      updateMessage(error.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    //NOTE: Here we are using a combination of conditions using the logical operator && to check the "truthiness" of username and password (if they have a value) and if password is strictly equal (===) to passwordConf --> The final result of the inner conditions is converted to the opposite because of the bang operator (!), so in this context: If all the fields are truthy/true then it returns "false" indicating that the form is VALID --> The function is used for the button prop of "disable" so it would be "disable=false" and we can click the button to submit the form because everything is valid in the input fields
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
