import * as React from "react";
import { Routes, Route, Navigate, useLocation, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/Navbar/Navbar";
import { Profile } from "./components/Profile/Profile";
import { SuccessGoogleLogin } from "./components/SuccessGoogleLogin/SuccessGoogleLogin";
import { HttpService } from "./utils/HttpService";
import Main from "./components/Main/Main";
import "./App.css";
import { SpeciesPage } from "./components/SpeciesPage/SpeciesPage";
import EndangeredSpecies from "./components/EndangeredSpecies/EndangeredSpecies";
import "./App.css";
import Header from "./components/Header/Header";
import QuotePage from "./components/QuotePage/QuotePage";
import PlanetEarth from "./components/PlanetEarth/PlanetEarth";
import { AnimalProfile } from "./models/AnimalProfile.entity";
import AnimalProfileCard from "./components/AnimalProfileCard/AnimalProfileCard";
import ProfileAnimal from "./components/ProfileAnimal/ProfileAnimal";
import News from "./components/News/News";

//Route Guard component
const RequireAuth: React.FC<any> = ({ children }) => {
  const location = useLocation();
  const [aut, setAut] = React.useState(true);
  React.useEffect(() => {
    HttpService.checkAuth()
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.data.payload.user))
        setAut(true)
      })
      .catch(response => setAut(false));
  }, [location])
  return aut === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />
}

export default function App() {
  return (
    <div>
      {/* <Nav /> */}
      <BrowserRouter>
        <Header isMain={true} />
        <Routes>
          <Route path={'/'} element={
            <>
              <Main />
              <QuotePage />
              <PlanetEarth />
            </>} />
          <Route path="/login" element={<Login />} />
          <Route path="/species/:id" element={
            <>
              {/*<Header isMain={false}/>*/}
              <SpeciesPage />
            </>} />
          <Route path="/endangeredspecies" element={
            <><EndangeredSpecies /></>} />

          <Route path="/endangeredspecies/:id" element={
            <><EndangeredSpecies /></>} />
          <Route path="/successGoogleLogin" element={<SuccessGoogleLogin />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Navbar />
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Navbar />
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/animal/:id"
            element={
              <>
                <ProfileAnimal />
              </>
            }
          />

          <Route
            path="/news"
            element={
              <>
                <News />
              </>
            }
          />


        </Routes>
      </BrowserRouter>
    </div>
  );
}