import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import store from "./redux/store";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";
import RedirectIfProtected from "./components/RedirectIfProtected";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Movie from "./pages/MovieDetail/Movie";
import MovieList from "./components/movielist/MovieList";
import './App.css'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <BrowserRouter>
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/register" element={
              <RedirectIfProtected>
                <Register />
              </RedirectIfProtected>
            }
            />
              <Route path="/login" element={
              <RedirectIfProtected>
                <Login />
                </RedirectIfProtected>
              }
              />

              <Route path="movie/:id" element={<Movie />} />
              <Route path="movies/:type" element={<MovieList />} />
              <Route path="/*" element={<h1>Error Page</h1>} />

              <Route
                path="/user/dashboard"
                element={
                  <Protected>
                    <Dashboard />
                  </Protected>
                }
              />
            </Routes>

            <ToastContainer theme="colored" />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </div>
  );
}

export default App;
