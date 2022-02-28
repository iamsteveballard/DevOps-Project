import logo from './logo.svg'
import './App.css'
import Lambda from './components/Lambda'
import { Account } from './components/Account'
import Status from "./components/Status"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <Account>
          <Lambda />
          <Status />          
        </Account>
        
      </div>
      </header>
    </div>
  )
}

export default App;
