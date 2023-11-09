import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Page from "./Components/Page/Page";
import {Routes, Route} from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Connection from "./Hook/Connection";
import Mqtt from "./Hook/Mqtt";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import History from "./Components/History/History";
import MenuAppBar from "./Components/Menu/MenuAppBar";
import DataSensor from "./Components/SensorData/DataSensor";
import DataTable from "./Components/SensorData/DataTable";
import Event from "./Components/Event/Event";

function App() {
  return (
    <div className="app">
      <div>
        {/*<Page/>*/}
          <MenuAppBar/>
        <Routes>
            <Route path = '/' element={<Mqtt/>} />
            <Route path = '/profile' element={<Profile/>} />
            <Route path = '/history' element={<History/>} />
            <Route path = '/datasensor' element={<DataSensor/>} />
            <Route path = '/datatable' element={<DataTable/>}/>
            <Route path = '/events' element={<Event/>} />
            {/*<Route path = '/control' element={<Mqtt/>} />*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;
