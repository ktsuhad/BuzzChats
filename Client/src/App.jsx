import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";

import "./App.css";
import Poll from "./Pages/Poll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chats" element={<Chatpage />} />
      <Route path="/polls" element={<Poll />} />
    </Routes>
  );
}

export default App;
