import "./App.css";

import Clock from "./components/Clock";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Name from "./components/Name";

function App() {
  return (
    <div className="App">
      <Header />
      <div className={"article"}>
        <Clock />
        <Name />
      </div>
      <Footer />
    </div>
  );
}

export default App;
