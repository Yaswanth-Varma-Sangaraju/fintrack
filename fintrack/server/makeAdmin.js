import connectDB from './config/db.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const makeAdmin = async () => {
    const emailToUpdate = process.argv[2];

    try {
        await connectDB();
        
        let user;
        if (emailToUpdate) {
            user = await User.findOne({ email: emailToUpdate });
        } else {
            console.log("⚠️ No email provided. Upgrading the most recently registered user instead.");
            user = await User.findOne().sort({ createdAt: -1 });
        }
        
        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`✅ Success! The user account '${user.email}' has been granted Admin privileges.`);
        } else {
            console.log(`❌ No user found with the email '${emailToUpdate}'. Please register that account first through the app.`);
        }
    } catch (error) {
        console.error("Error updating user:", error);
    } finally {
        process.exit(0);
    }
};

makeAdmin();
