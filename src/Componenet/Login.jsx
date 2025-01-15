import React, { useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const emailRef = useRef();
  const { userLogin, setUser, handleSignInWithGoogle, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoading(true);
    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("You have logged in successfully!");
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Failed to log in. Please try again.");
        setLoading(false);
      });
  };

  const loginWithGoogle = () => {
    setLoading(true);
    handleSignInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("You have logged in successfully!");
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message || "Failed to log in with Google. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 via-green-600 to-green-700">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Welcome Back!</h2>
        <p className="text-sm text-center text-gray-600 mb-4">Login to access your account</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition font-medium shadow-md"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>New to PawPal?</span>
          <Link to="/register" className="text-green-600 hover:underline">Register</Link>
        </div>
        <div className="divider my-6 text-gray-400 text-center">OR</div>
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium shadow-sm"
        >
          <FcGoogle className="mr-2 text-lg" />Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
