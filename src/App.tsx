import { BrowserRouter } from "react-router-dom";
import AppRoot from "./rooting/AppRoot";
import axios from "axios";
import axiosRetry from "axios-retry";
import { API_URL } from "./constants/environnement";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";

  //If Unauthorized, wait for a bit then retry (useAuth might be retrieving the token)
  axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryNumber) => axiosRetry.exponentialDelay(retryNumber) / 5,

    retryCondition: (error) => error.response?.status === 401,
  });
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AppRoot></AppRoot>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
