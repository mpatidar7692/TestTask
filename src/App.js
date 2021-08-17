import { useEffect } from "react";
import "./App.css";
import "./components/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewUser from "./components/NewUser";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={UserList}></Route>
          <Route path="/create-user" exact component={NewUser}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
