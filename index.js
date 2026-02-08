const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/leads', require('./routes/leads'))

const PORT = process.env.PORT || 5000;

app.get('/',(req, res)=>{
    res.send("Lead generator backend running successfully");
})

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})