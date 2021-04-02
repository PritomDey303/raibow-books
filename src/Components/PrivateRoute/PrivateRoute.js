import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { BookContext } from "../../App";

export default function PrivateRoute({ children, ...rest }) {
  const [, , LoggedInUser] = useContext(BookContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        LoggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
