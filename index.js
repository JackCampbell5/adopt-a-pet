const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;

const petRoutes = require('./routes/petRoutes')


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/pet', petRoutes)


app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});
