import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp } from './screens/SignUp';
import { SignIn } from './screens/SignIn';
import Dashboard from './screens/Dashboard';
import SendMoney from './screens/SendMoney';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} />}
          />
          <Route
            path="/send"
            element={<ProtectedRoute element={SendMoney} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
