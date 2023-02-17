import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminAccess from './Pages/Admin/AdminAccess';
import Admin from './Pages/Admin/Admin';
import ProjectList from './Pages/ProjectList/ProjectList';


function App() {
  return (
    <div className="App">
      {/* <AdminAccess/> */}
      <Routes>
        <Route exact path="/" element={<AdminAccess />} />
        <Route exact path="/AdminAccess" element={<Admin />} />
        <Route exact path="/Projectlist" element={<ProjectList />} />
      </Routes>


    </div>
  );
}

export default App;
