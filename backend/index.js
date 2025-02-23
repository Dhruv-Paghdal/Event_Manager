require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// Connect to MongoDB and start server
const PORT = process.env.APP_PORT || 5000;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log('DB connected successfully.');
}).catch((err)=>{
    console.log('Error while connecting to DB.');
    console.log(err);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
