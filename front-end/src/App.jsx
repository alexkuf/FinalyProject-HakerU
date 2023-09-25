import "./App.css";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import About from "./components/about";
import MyPage from "./components/myPage";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/signin";
import SignOut from "./components/signout";
import ProtectedRoute from "./components/common/protectedRoute";
import MySetings from "../src/components/mySetings";
import AddNameProject from "./components/addNameProject";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardsCreate from "../src/components/cardsCreate";
import CardsDelete from "./components/cardsDelete";
import CardsEdit from "./components/cardsEdit";
import AddUser from "./components/addUser";
import UserDelete from "./components/userDelete";
import EditUser from "./components/editUser";
import RefreshPassword from "./components/refreshPassword";
import Reports from "./components/report";
import ForgotPpassword from "../src/components/support";
import Todo from "./components/todo";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

function App() {
  const [data, setData] = useState();
  const [theme, setTheme] = useState(
    localStorage.getItem("selectedTheme", "light")
  );
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    localStorage.setItem("selectedTheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={(theme, toggleTheme)}>
      <div className="app d-flex flex-column min-vh-100" id={theme}>
        <ToastContainer />
        <header>
          <Navbar
            data={data}
            setData={setData}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        </header>
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="about" element={<About />} />
            <Route path="my-page" element={<MyPage theme={theme} />} />
            <Route
              path="todo"
              element={<Todo setData={setData} theme={theme} />}
            />
            <Route path="sign-in" element={<SignIn redirect="/" />} />
            <Route path="support" element={<ForgotPpassword redirect="/" />} />
            <Route path="sign-out" element={<SignOut redirect="/" />} />
            <Route
              path="create-nameproject"
              element={<AddNameProject redirect="/create-nameproject" />}
            />
            <Route
              path="create-card"
              element={<CardsCreate redirect="/create-card" />}
            />
            <Route path="all-cards/delete/:id" element={<CardsDelete />} />
            <Route
              path="all-cards/edit/:id"
              element={<CardsEdit theme={theme} />}
            />
            <Route
              path="manage"
              element={
                <ProtectedRoute onlyisAdmin>
                  <MySetings redirect="/manage" theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="reports"
              element={
                <ProtectedRoute onlyisAdmin>
                  <Reports theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-user"
              element={
                <ProtectedRoute onlyisAdmin>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="all-users/edit/:id"
              element={
                <ProtectedRoute onlyisAdmin>
                  <EditUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="all-users/delete/:id"
              element={
                <ProtectedRoute onlyisAdmin>
                  <UserDelete />
                </ProtectedRoute>
              }
            />
            <Route
              path="refresh-password/:id"
              element={
                <ProtectedRoute onlyisAdmin>
                  <RefreshPassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer theme={theme} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
