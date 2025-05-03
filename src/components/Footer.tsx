import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} DermaQ. All rights reserved.
        </p>
        <p className="text-sm">
          <Link to="/privacy-policy" className="hover:text-blue-400">
            Privacy Policy
          </Link>{' '}
          |
          <Link to="/terms" className="hover:text-blue-400">
            {' '}
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
