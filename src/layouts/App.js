import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useSelector } from "react-redux";

import Chat from "../pages/Chat";
import Login from "../pages/Login";
import SetAvatar from "../components/setAvatar/SetAvatar";
// import authSelectors from "../redux/selectors/authSelectors";

function App() {
  // const userSelector = useSelector(authSelectors);
  // const isLogin = userSelector.isLogin;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
