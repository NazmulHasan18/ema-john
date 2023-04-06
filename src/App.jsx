import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/Header/Header";
import Products from "./component/Products/Products";

function App() {
   return (
      <div className="App">
         <Header></Header>
         <Outlet></Outlet>
      </div>
   );
}

export default App;
