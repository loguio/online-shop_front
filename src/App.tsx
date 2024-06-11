import { BrowserRouter } from "react-router-dom";
import AppRoot from "./rooting/AppRoot";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoot></AppRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
