import './App.css';
import { Navigate, Routes, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import NoLibraryForm from './NoLibraryForm/NoLibraryForm';
import NoLibraryFormNew from './NoLibraryFormNew/NoLibraryFormNew';
import ControlledForms from './ControlledForm/ControlledForm';
import UncontrolledForms from './UncontrolledForm/UncontrolledForm';

const App = () => {
  return (
    <div className="app">
      <Menu />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/no-library-form" replace />} />
          <Route path="/no-library-form" element={<NoLibraryForm />} />
          <Route path="/no-library-form-new" element={<NoLibraryFormNew />} />
          <Route path="/controlled-form" element={<ControlledForms />} />
          <Route path="/uncontrolled-form" element={<UncontrolledForms />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
