import './App.css';
import{BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
import PokemonCreate from "./components/PokemonCreate/PokemonCreate"
import Detail from './components/Detail/Detail.jsx';
import Comparation from './components/Comparation/Comparation';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Switch>
<Route exact path= "/" component={LandingPage} />
<Route path="/home" component={Home} />
<Route exact path="/pokemon" component={PokemonCreate} />
<Route path='/pokemon/:id' component={Detail} />
<Route exact path='/comparation' component={Comparation} />
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
