require('dotenv').config()
const axios = require('axios')
const advice_odds = require('./get_advice_odds')

const API_HEADERS = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
}

const SEASON = '2024'


const get_advice = async (fixture_id) => {

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/predictions',
        params: {fixture: fixture_id},
        headers: API_HEADERS
    };
    
    try {
        const res = await axios.request(options);
        return res.data.response[0].predictions.advice
    } catch (error) {
        console.error(error);
    }

}


const get_form = async (league_id, team_id) => {

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
        params: {
          league: league_id,
          team: team_id,
          season: SEASON,
        },
        headers: API_HEADERS
    }

    try {
        const res = await axios.request(options)
        const data = res.data.response
        const form = data.form
        return form

    } catch (error) {
        console.error(error)
    }
}


const get_team_fixture = async (teamID) => {

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
            season: SEASON,
            team: teamID,
            next: '1'    //Get only the next 1 fuxture
        },
        headers: API_HEADERS
    }
      
    try {
        const res = await axios.request(options);
        const data = res.data.response[0];
        const home_team_id = data.teams.home.id
        const home_team = data.teams.home.name
        const away_team_id = data.teams.away.id
        const away_team = data.teams.away.name
        const league_id = data.league.id
        const league = data.league.name
        const fixture_id = data.fixture.id
        console.log(fixture_id)
        const advice = await get_advice(fixture_id)
        // const form_home_team = await get_form(league_id, home_team_id)
        // const form_away_team = await get_form(league_id, away_team_id)
        const odds = await advice_odds.odds(advice, fixture_id, home_team, away_team)
        return {
                    fixture_id,
                    home_team_id,
                    home_team,
                    away_team_id, 
                    away_team,
                    league_id,
                    league,
                    advice, 
                    odds,
                    // form_home_team, 
                    // form_away_team,
                }
    } catch (error) {
        console.error(error)
    }

}

module.exports = {
    get_team_fixture
}