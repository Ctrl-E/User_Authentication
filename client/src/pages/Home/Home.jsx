import axios from "axios";
import React, { useEffect, useState } from "react";
import Signup from "../../components/Signup/Signup";

const apiUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_APP_API_URL_PROD
    : import.meta.env.VITE_APP_API_URL;

const Home = () => {
  const [user, setUser] = useState("");
  const [crypto, setCrypto] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    // First axios call
    axios.get(`${apiUrl}/`).then((result) => {
      if (result.data.message === "Success") {
        console.log(result);
        setUser(result.data.decodedData.email);
      }
    });
  }, []);

  useEffect(() => {
    // Second axios call, dependent on the value of 'user'
    if (user) {
      axios
        .get(`${apiUrl}/crypto`, {
          params: {
            user: user,
          },
        })
        .then((result) => {
          setCrypto([result.data[0], result.data[1]]);
          console.log(result.data);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <Signup />
      </>
    );
  }

  return (
    <div>
      Hello: {user}
      <br></br>
      LTC : {crypto[0]}
      <br></br>
      BTC : {crypto[1]}
    </div>
  );
};

export default Home;
