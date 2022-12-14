import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { getLoggedIn, logout } from "./services/auth";
import * as USER_HELPERS from "./utils/userToken";
import profileDefault from "./images/profile-default.png";

// Import pages
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SerieDetailsPage from "./pages/SerieDetailsPage";
import MyListPage from "./pages/MyListPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ProtectedPage from "./pages/ProtectedPage";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState();
  const [profileImage, setProfileImage] = useState(profileDefault);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    user?.avatar && setProfileImage(user?.avatar);
  }, [user?.avatar]);

  const changeProfileImage = () => {
    axios
      .get(`${API_URL}/user/${user._id}`)
      .then((res) => {
        setProfileImage(res.data.avatar);
      })
      .catch((err) => console.log(err));
  };

  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  const searchResults = (value) => {
    setSearch(value);
    navigate(`/search/${value}`);
  };

  return (
    <div className="App">
      <Navbar
        handleLogout={handleLogout}
        searchResults={searchResults}
        search={search}
        user={user}
        profileImage={profileImage}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth/login"
          element={<LogIn authenticate={authenticate} />}
        />
        <Route
          path="/auth/signup"
          element={<Signup authenticate={authenticate} />}
        />
        <Route path="/search/:search" element={<Search search={search} />} />
        <Route
          path="/movie/:movieId"
          element={<MovieDetailsPage user={user} />}
        />
        <Route
          path="/serie/:serieId"
          element={<SerieDetailsPage user={user} />}
        />
        <Route
          path="/myList"
          element={
            <ProtectedPage userSession={user}>
              <MyListPage userSession={user} />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedPage userSession={user}>
              <ProfilePage userSession={user} />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedPage userSession={user}>
              <EditProfilePage
                userSession={user}
                changeProfileImage={changeProfileImage}
              />
            </ProtectedPage>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
