import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { AddPage } from './components/pages/AddPage';
import { ViewPage } from './components/pages/ViewPage';
import { UpdatePage } from './components/pages/UpdatePage';
import { DeletePage } from './components/pages/DeletePage';
 

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/AddPage" exact component={AddPage} />
          <Route path="/ViewPage/:id" exact component={ViewPage} />
          <Route path="/UpdatePage/:id" exact component={UpdatePage} />
          <Route path="/DeletePage/:id" exact component={DeletePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;