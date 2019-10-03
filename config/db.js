const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        // Cac params la de ko co warning o console
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        
        console.log('MongoDB connected!')
    } catch (err) {
        console.err(err.message);
        process.exit(1); // Exit with failure
    }

    
    // mongoose
    //     .connect(db, {
    //         useNewUrlParser: true,
    //         useCreateIndex: true,
    //         useFindAndModify: false
    //     })
    //     .then(() => console.log('MongoDB connected!'))
    //     .catch(err => {
    //         console.err(err.message);
    //         process.exit(1); // Exit with failure
    //     });
};

module.exports = connectDB;