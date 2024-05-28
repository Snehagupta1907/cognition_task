import { useEffect } from "react";
import Navbar from "../components/Navbar";
import TicketList from "../components/TicketList";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'employer') {
      navigate('/login'); // Redirect to login if not authorized
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen">
      <Navbar />
      <TicketList />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Home;
