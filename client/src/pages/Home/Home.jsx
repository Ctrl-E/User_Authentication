import axios from "axios";
import React, { useEffect, useState } from "react";
import Signup from "../../components/Signup/Signup";
import LogoutButton from "../../components/Logout/LogoutButton";

const apiUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_APP_API_URL_PROD
    : import.meta.env.VITE_APP_API_URL;

axios.defaults.withCredentials = true;
const Home = () => {
  const [user, setUser] = useState("");
  const [crypto, setCrypto] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${apiUrl}/`);
        console.log(result.data.message);
        if (result.data.message === "Success") {
          console.log(result);
          setUser(result.data.decodedData.email);
          setLoading(false);
        } else if (result.data.message === "Access Denied") {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occured please try again few minutes</p>;
  }

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
      <LogoutButton />
    </div>
  );
};

export default Home;
