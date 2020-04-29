import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Route,
  HashRouter as Router,
  Switch,
  Link
} from 'react-router-dom';

import {
  Page1,
  Page2
} from './components';

function App() {
  return (
    <Router>
      <>
        <nav>
          <Link to="/">Page 1</Link>
          <Link to="/Two">Page 2</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Page1} />
          <Route exact path="/Two" component={Page2} />
        </Switch>
      </>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
