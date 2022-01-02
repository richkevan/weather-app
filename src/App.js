import { Helmet } from "react-helmet";
import './App.css';
import WeatherForm from "./components/weatherForm";

function App() {
  return (
    <div className="App">
      {/* <Helmet>
     <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnYglDRMWsTApdaAovosVnyUVn7TQ3plk&libraries=places&callback=initMap">
    </script> 
      </Helmet> */}
      <WeatherForm />
    </div>
  );
}

export default App;
