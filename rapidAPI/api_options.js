// require('dotenv').config()

exports.api_options = ({teamID, fixture_id, league_id, endpoint}) => {

    const API_HEADERS = {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
    const SEASON = '2024'
    const BOOKMAKER_ID = 8  // Bet365

    const params = {}

    if (endpoint == 'predictions') params.fixture = fixture_id
    if (endpoint == 'fixtures') {
        params.season = SEASON
        params.team = teamID
        params.next = 1
    }
    if (endpoint == 'odds') {
        params.fixture = fixture_id
        params.bookmaker = BOOKMAKER_ID
    }
    if (endpoint == 'statistics') {
        params.season = SEASON
        params.team = teamID
        params.league_id = league_id
    }


    return {
        method: 'GET',
        url: `https://api-football-v1.p.rapidapi.com/v3/${endpoint}`,
        params: params,
        headers: API_HEADERS,
    }
    
}