import { BrowserRouter } from "react-router-dom";
import AppRoot from "./rooting/AppRoot";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
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
