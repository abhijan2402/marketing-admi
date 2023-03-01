import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminAccess from './Pages/Admin/AdminAccess';
import Admin from './Pages/Admin/Admin';
import ProjectList from './Pages/ProjectList/ProjectList';
import Feedback from './Pages/Feedback/Feedback';



function App() {
  return (
    <div className="App">
      {/* <AdminAccess/> */}
      <Routes>
        <Route exact path="/Admin" element={<Admin />} />
        <Route exact path="/" element={<AdminAccess />} />
        <Route exact path="/Projectlist" element={<ProjectList />} />
        <Route exact path="/Feedback" element={<Feedback />} />
      </Routes>


    </div>
  );
}

export default App;
