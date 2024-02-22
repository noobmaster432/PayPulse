require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const connectDB = require('./db/connect.js');
const rootRouter = require('./routes/index.js');

app.use(cors({
    origin: "*",
}));

app.use(express.json());

app.use('/api/v1', rootRouter);

app.get('/', (req, res) => {
    res.json({ msg: 'Paytm Server is running'});
})

connectDB();
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});