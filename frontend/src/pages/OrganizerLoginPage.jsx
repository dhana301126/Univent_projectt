
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context';
import { LoginForm } from '../components/auth';

const OrganizerLoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLoginSuccess = () => {
    // ProtectedRoute will enforce the user's actual role.
    navigate('/organizerdashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/beach2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Univent
        </h1>
        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Organizer Login
        </h2>

        <LoginForm onSuccess={handleLoginSuccess} />

        <p className="mt-6 text-center text-white text-sm">
          Participant?{' '}
          <Link to="/login" className="text-yellow-300 font-semibold">
            Participant Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OrganizerLoginPage;
