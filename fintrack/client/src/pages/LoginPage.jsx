import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../features/auth/authSlice';
import { loginUser } from '../features/auth/authThunks';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Briefcase } from 'lucide-react';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { user, token, loading, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && token) {
            navigate('/dashboard');
        }
        dispatch(clearError());
    }, [user, token, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-screen flex text-white bg-bg"
        >
            <div className="hidden lg:flex lg:w-1/2 bg-surface items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-900/20 to-bg z-0"></div>
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-lime-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
                <div className="relative z-10 max-w-lg">
                    <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-green-500/50">
                        <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">Take Control of Your Financial Future</h1>
                    <p className="text-xl text-gray-400">FinTrack provides intelligent insights and budgeting tools to help you manage your money with confidence.</p>
                </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <span className="font-bold text-xl">F</span>
                        </div>
                        <span className="text-2xl font-bold">FinTrack</span>
                    </div>

                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-gray-400 mb-8">Enter your credentials to access your account.</p>

                    {error && (
                        <div className="bg-red-500 bg-opacity-10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="••••••••"
                            />
                        </div>
                        <Button type="submit" variant="primary" className="w-full py-3 mt-4" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-gray-400">
                        Don't have an account? <Link to="/register" className="text-primary hover:text-indigo-400 font-medium">Create one</Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default LoginPage;
