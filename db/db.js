const { Pool } = require('pg');
require('dotenv').config()

// Create a new pool instance
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
})

// Initialize the database
async function init() {
    try {
        const client = await pool.connect()
        console.log(`Connected to PostgreSQL`)

        // Run the SQL instruction to create the table if it does not exist
        await client.query('CREATE TABLE IF NOT EXISTS games (fixture_id VARCHAR(20), home_team_id VARCHAR(20), home_team VARCHAR(255), away_team_id VARCHAR(20), away_team VARCHAR(255), league_id VARCHAR(20), league VARCHAR(255),  advice VARCHAR(255), odds VARCHAR(255), form_home_team VARCHAR(255), form_away_team VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
        console.log('Connected to db and created table games if it did not exist')
        client.release()
    } catch (err) {
        console.error('Unable to connect to the database:', err)
    }
}

// Store an array of fixture objects into the database
async function storeData(data) {
    try {
        const client = await pool.connect()
        for (const item of data) {
            const { fixture_id, home_team, away_team, league, league_id, advice, odds, form_home_team, form_away_team, home_team_id, away_team_id } = item

            // Run the SQL instruction to insert the object into the games table
            await client.query('INSERT INTO games (fixture_id, home_team, away_team, league, league_id, advice, odds, form_home_team, form_away_team, home_team_id, away_team_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [fixture_id, home_team, away_team, league, league_id, advice, odds, form_home_team, form_away_team, home_team_id, away_team_id])
            console.log(item)
        }
        console.log('Data stored successfully')
        client.release()
    } catch (err) {
        console.error('Error storing data:', err)
    }
}

// Get data from the database given an array of team ids
async function getDataByTeamIds(teamIds) {
    try {
        const client = await pool.connect()

        // Run the SQL instruction to fetch data from the games table for the given team ids
        const query = 'SELECT * FROM games WHERE home_team_id = ANY($1::text[]) OR away_team_id = ANY($1::text[])'
        const result = await client.query(query, [teamIds])
        console.log('Data fetched successfully')
        client.release()
        return result.rows
    } catch (err) {
        console.error('Error getting data:', err)
        return {Error: "Error getting data from the database"}
    }
}

async function deleteData() {
    try {
        const client = await pool.connect()
        const query = 'TRUNCATE TABLE games'
        await client.query(query)
        console.log('Data deleted successfully');
        client.release()
    } catch (error) {
        console.error('Error deleting data: ', error)
    }
}


module.exports = {
    init,
    storeData,
    getDataByTeamIds,
    deleteData
}