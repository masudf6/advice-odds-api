const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/db');
const getFixtures = require('./routes/getFixtures');
const  { clubs } = require('./utils/teams');
const { runIngestion } = require('./utils/ingestion');

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init();

const PORT = process.env.PORT || 8000;

// setInterval(async () => {
//     const teamIds = clubs.map(club => club.code);
//     await runIngestion(teamIds);
//     console.log("Ingestion ran successfully")
// }, 1000 * 60 * 24); // Run every 24 hours

app.get('/api', (req, res) => {
    res.json({ apiHomeMessage: 'API up and running | send POST requests' })
})

// params: teams: array of team ids
app.post('/api', getFixtures)


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})