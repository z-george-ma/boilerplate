/// <reference path="../typings/index.d.ts" />

import React          = require("react")
import ReactBootstrap = require("react-bootstrap")
let Jumbotron = ReactBootstrap.Jumbotron
interface DemoProps {
  name:string;
}

class Demo extends React.Component<DemoProps, any> {
  private foo:number;
  constructor(props:DemoProps) {
    super(props);
    this.foo = 42;
  }
  render() {
    return (
      <div>Hello world!</div>
    );
  }
}

React.render(<Jumbotron>
    <h1>Hello, world!</h1>
    <p>This is HTML5 Boilerplate.</p>
  </Jumbotron>, document.getElementById('app'));
