import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import Navbar from "../../Navbar";
import Sidebar from "./Sidebar";
import LeadAll from "./LeadAll";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <LeadAll />
    </>
  );
};

export default AdminDashboard;
