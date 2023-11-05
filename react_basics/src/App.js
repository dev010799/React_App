// import logo from './logo.svg';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
// import TextForm from './components/TextForm';

// let name = "Dev";
function App() {
  return (
    <> 
    {/* <Navbar title="TextUtils" aboutText="About TextUtils" />*/ }
    <Navbar title="TextUtils" />  
    <div className="container my-3">
    <About />
    {/* <TextForm heading="Enter the text to analyze below" /> */}
    </div>
    
      {/*<Navbar />*/} 
    </> 
  );
}

export default App;














