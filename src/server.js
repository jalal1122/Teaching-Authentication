import app from './app.js';
import connectDB from './config/db.js';
import {config} from 'dotenv';

config();

const PORT = process.env.PORT || 8008;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
