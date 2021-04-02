import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NotFound from "./Components/404/NotFound";
import Admin from "./Components/Admin/Admin";
import CheckOut from "./Components/CheckOut/CheckOut";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Orders from "./Components/Orders/Orders";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
export const BookContext = createContext();
function App() {
  const [bookInfo, setBookInfo] = useState([]);
  const [LoggedInUser, setLoggedInUser] = useState({});
  useEffect(() => {
    fetch("https://rainbow-books303.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => {
        setBookInfo(data);
      });
  }, []);
  return (
    <div className="app">
      <BookContext.Provider
        value={[bookInfo, setBookInfo, LoggedInUser, setLoggedInUser]}
      >
        <Router>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>
            <PrivateRoute path="/checkout/:id">
              <CheckOut />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </BookContext.Provider>
    </div>
  );
}

export default App;
