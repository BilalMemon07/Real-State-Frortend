import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LeadAll from "./LeadAll";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <LeadAll />
    </>
  );
};

export default EmployeeDashboard;
