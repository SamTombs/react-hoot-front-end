import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import HootList from "./components/HootList/HootList";
import * as hootService from "./services/hootService";
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData);
    };
    if (user) fetchHoots();
  }, [user]);

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            <Route path="/hoots/:hootId" element={<HootDetails />} />
            <Route
              path="/hoots/new"
              element={<HootForm handleAddHoot={handleAddHoot} />}
            />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;


// As the author of a hoot, I should see a link to ‘Edit’ a hoot on the ‘Details’ page. Clicking on the link should direct me to an ‘Edit’ page where I can modify the hoot. Upon submitting the update, I should be redirected back to the ‘Details’ page.
// As the author of a hoot, I should see a button to ‘Delete’ a hoot on the ‘Details’ page. Clicking the button should delete the hoot and redirect me back to the ‘List’ page.
