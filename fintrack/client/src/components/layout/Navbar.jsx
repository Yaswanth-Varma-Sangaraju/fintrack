import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import { clearTransactionsState } from '../../features/transactions/transactionSlice';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(clearTransactionsState());
    };

    return (
        <header className="bg-surface border-b border-border h-16 flex items-center justify-end px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm">{user?.name}</span>
                </div>
                <button 
                    onClick={handleLogout}
                    className="p-2 hover:bg-[#2D2D4A] rounded-lg transition text-gray-400 hover:text-red-400"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
