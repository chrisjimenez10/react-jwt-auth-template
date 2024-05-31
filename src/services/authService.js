
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
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  signup,
};
