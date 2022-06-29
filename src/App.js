import Register from "./Components/Register";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Missing from "./Components/Missing";
import Unauthorized from "./Components/Unauthorized";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import EmployeeDashboard from "./Components/Pages/Employee/EmployeeDashboard";
// Admin Components
import AdminDashboard from "./Components/Pages/Admin/AdminDashboard";
import LeadCreate from "./Components/Pages/Admin/LeadCreate";
import LeadAll from "./Components/Pages/Admin/LeadAll";
import LeadExcel from "./Components/Pages/Admin/LeadExcel";
import AddMember from "./Components/Pages/Admin/AddMember";
import CustomerProfile from "./Components/Pages/Admin/CustomerProfile";

const ROLES = {
  Admin: 1989,
  Director: 1990,
  TL: 1991,
  FOS: 1992,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* we want to protect these routes */}

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.FOS]} />}>
            <Route path="/" element={<EmployeeDashboard />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/" element={<Navigate replace to="/admin" />} />
            <Route exact path="/admin" element={<AdminDashboard />} />
            <Route path="/leadcreate" element={<LeadCreate />} />
            <Route path="/leads" element={<LeadAll />} />
            <Route path="/addmember" element={<AddMember />} />
            <Route path="/leadexcel" element={<LeadExcel />} />
            <Route path="/customerprofile/:id" element={<CustomerProfile />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
