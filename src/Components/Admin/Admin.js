import React from "react";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import AddBook from "./AddBook/AddBook";
import EditBook from "./EditBook/EditBook";
import ManageBook from "./ManageBook/ManageBook";
import SideNav from "./SideNav/SideNav";
function Admin() {
  return (
    <div>
      <Navigation></Navigation>
      <Router>
        <Row>
          <Col>
            <SideNav></SideNav>
          </Col>
          <Col sm={9}>
            <Switch>
              <Route path="/admin/addbook">
                <AddBook />
              </Route>
              <Route path="/admin/managebooks">
                <ManageBook />
              </Route>
              <Route path="/admin/editbook">
                <EditBook />
              </Route>

              <Route exact path="/admin">
                <AddBook />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Router>
    </div>
  );
}

export default Admin;
