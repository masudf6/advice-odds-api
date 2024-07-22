const advice_odds = require('./advice/get_advice_odds')
const { get_fixture_data, get_advice, get_form } = require('../rapidAPI/api-calls')

const get_team_fixture = async (teamID) => {
      
    try {
        const data = await get_fixture_data(teamID)
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
        throw error
    }

}

module.exports = {
    get_team_fixture
}