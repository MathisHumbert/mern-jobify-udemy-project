import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute } from './pages';
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* nested pages */}
        <Route
          path='/'
          element={
            // protected route
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* index === relaive path / homepage */}
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
