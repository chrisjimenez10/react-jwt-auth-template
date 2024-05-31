
//Back-End URL - This is the Back-End Express API we built that will receive the incoming requests from our front-end React App
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // this is our Express API url

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signin = async (user) => {
    try {
      const res = await fetch(`${BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const json = await res.json();
  
      if (json.error) {
        throw new Error(json.error);
      }
      
      //Token is created in the route handler responsible for the "signin", so we can check if it is created and then use the token to extract a decoded version of the payload (paylod: second string element of the JWT that contains the claims --> which is information about the user like username, id, and other metadata)
      if (json.token) {
        //NOTE: Line 40 is extracting the payload from the JWT and storing it to the "user" variable --> The "JSON.parse(atob(json.token.split(".")[1]" is splitting the JWt into its 3 components which are separated by a dot (.) --> "atob" decodes the JWT because it was encrypted using the Base64Url format and the split(".") string method is creating the three string components into an array of three strings by including the symbol/delimiter used to separate them when they were in string format and then we grab the string element at index 1 because that is where the "payload" is located
        const user = JSON.parse(atob(json.token.split('.')[1]));
        return user; //Here, we are returning the decoded paylaod from the JWT which corresponds to the user data object
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  

export {signup, signin};
