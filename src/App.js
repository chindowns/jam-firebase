import React from 'react';
// USE HashRouter vs BrowserRouter to display on G
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Nav, Form, FormControl, Button} from 'react-bootstrap';
import logo from './logo-white.png';
import './App.css';
import AddApplication from './pages/addApplication';
import ViewApplication from './pages/viewApplications';
import EditApplication from './pages/editApplication';

function App() {
  return (
    <div className="App">
      <header className="">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-header">
          JAM
        </p>
        
        <Nav variant="" className=" nav m-auto">
            <Nav.Link variant="outine" className="nav" eventKey="link-1" href="#/">Home</Nav.Link>
            <Nav.Link className="nav" href="#/view">View Application</Nav.Link>
            <Nav.Link className="nav" href="#/add">Add Applications</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>

      </header>

      <Router>
        <Switch>
          <Route exact path="/" component={ViewApplication} />
          <Route exact path="/view" component={ViewApplication} />
          <Route exact path="/add" component={AddApplication} />
          <Route exact path="/edit" component={EditApplication} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
