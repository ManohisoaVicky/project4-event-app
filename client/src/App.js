import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import NavBar from "../src/components/NavBar/NavBar";
import HomePage from "../src/pages/HomePage/HomePage";
import EventDetailPage from "../src/pages/EventDetailPage/EventDetailPage";
import LogInPage from "../src/pages/LogInPage/LogInPage";
import NewEventPage from "../src/pages/NewEventPage/NewEventPage";
import ProfilePage from "../src/pages/ProfilePage/ProfilePage";
import SignUpPage from "../src/pages/SignUpPage/SignUpPage";
import UpdateEventPage from "../src/pages/UpdateEventPage/UpdateEventPage";
import ProfileEditPage from "./pages/ProfileEditPage/ProfileEditPage";

import useUser from "./hooks/userUser";

function App() {
  const [state, setState] = useState();

  const { refreshAuth } = useUser();

  useEffect(() => {
    refreshAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header>
        <NavBar state={state} setState={setState} />
      </header>
      <main>
        <Routes>
          <Route exact path="*" element={<Navigate to="/" />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/login" element={<LogInPage />} />
          <Route
            exact
            path="/profile/edit/:userID"
            element={<ProfileEditPage state={state} setState={setState} />}
          />
          <Route exact path="/profile/:userID" element={<ProfilePage />} />
          <Route exact path="/event/new" element={<NewEventPage />} />
          <Route
            exact
            path="/event/detail/:eventID"
            element={<EventDetailPage />}
          />
          <Route
            exact
            path="event/edit/:eventID"
            element={<UpdateEventPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
