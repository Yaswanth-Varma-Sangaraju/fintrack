import connectDB from './config/db.js';
import Transaction from './models/Transaction.js';
import dotenv from 'dotenv';
dotenv.config();

const test = async () => {
    await connectDB();
    const t = await Transaction.findOne({ note: "Pizza At Domino's" });
    if(t) {
        console.log("Transaction found:", t);
        console.log("Deleteing...");
        try {
            await t.deleteOne();
            console.log("Deleted successfully");
        } catch(e) {
            console.log("Error deleting:", e);
        }
    } else {
        console.log("Transaction not found. Maybe it WAS deleted but UI is stuck?");
    }
    process.exit(0);
};
test();
