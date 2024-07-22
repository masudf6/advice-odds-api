const axios = require('axios')
const { api_options } = require('./api_options')

const get_fixture_data = async (teamID) => {

    const endpoint = 'fixtures'

    try {
        const options = api_options({teamID, endpoint})
        const res = await axios.request(options);
        return res.data.response[0];
        
    } catch (error) {
        console.error(error)
        throw error
    }

}

const get_advice = async (fixture_id) => {

    const endpoint = 'predictions'
    
    try {
        const options = api_options({fixture_id, endpoint})
        const res = await axios.request(options)
        return res.data.response[0].predictions.advice
    } catch (error) {
        console.error(error)
        throw error
    }

}

const get_advice_odds_data = async (fixture_id) => {

    const endpoint = 'odds'
    
    try {
        const options = api_options({ fixture_id, endpoint })
        const res = await axios.request(options)
        return res.data.response[0]
    } catch (error) {
        console.error('Error fetching data from API:', error)
        return null
    }

}

const get_form = async (league_id, teamID) => {

    // const options = {
    //     method: 'GET',
    //     url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
    //     params: {
    //       league: league_id,
    //       team: team_id,
    //       season: SEASON,
    //     },
    //     headers: API_HEADERS
    // }

    const endpoint = 'statistics'

    try {
        const options = api_options({ teamID, league_id, endpoint })
        const res = await axios.request(options)
        const data = res.data.response
        const form = data.form
        return form

    } catch (error) {
        console.error(error)
    }
}

module.exports = { 
    get_advice,
    get_advice_odds_data,
    get_fixture_data,
    get_form,
}