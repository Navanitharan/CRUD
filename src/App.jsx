import { createContext, useState } from "react";
import "./App.css";
import CreateUser from "./CreateUser.jsx";
import HomePage from "./HomePage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const DataContext = createContext();

function App() {
  const [userData, setUserData] = useState([]);

  const [editData, setEditData] = useState(null);

  return (
    <DataContext.Provider
      value={{ userData, setUserData, editData, setEditData }}
    >
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createPage" element={<CreateUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export { App as default, DataContext };
