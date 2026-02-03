// import TrainerEnrollmentPage from "./TrainerEnrollMgmt/pages/TrainerEnrollmentPage";


// function App() {
//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
//         Trainer Enrollment Management
//       </h1>
//       <TrainerEnrollmentPage />
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import TrainerEnrollmentPage from './TrainerEnrollMgmt/pages/TrainerEnrollmentPage';
import theme from './theme/theme';
import ProgramMgmt from './components/programManagement/ProgramMgmt';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/trainer-enrollments" element={<TrainerEnrollmentPage />} />
          <Route path="/program-Management" element={<ProgramMgmt/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
