import { useState } from 'react'
import './styles/style.css'
import Video from './components/Recordeded_Video'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Alert from './components/Alert'
// import Login from './pages/Login'
import Settings from './components/Settings'
import WebcamComponent from './components/Webcamcomponet'
import Report from './components/Report'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Routes>
          {/* <Route path="/camera" element={<Camera/>} /> */}
          <Route path="/" element={<>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Home />
          </>} />

          <Route path="/alert" element={<>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Alert />
          </>} />

          <Route path="/reports" element={<>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Report/>
          </>} />

          <Route path="/setting" element={<>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Settings /></>} />

            <Route path="/livecam" element={<>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <WebcamComponent /></>} />
                <Route path="/Video" element={<>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Video /></>} />

        </Routes>
      </div>
                  

    </Router>
    
  );
}

export default App;

