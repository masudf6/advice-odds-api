const { get_advice_odds_data } = require('../../rapidAPI/api-calls')

const { get_winner_odds, get_double_chance_odds, get_over_under_odds } = require('./get_odds')

exports.odds = async (advice, fixture_id, home_team, away_team) => {

    const data = await get_advice_odds_data(fixture_id)

    // Guard clause for games with no bets offered
    if (data === null || data === undefined) return 1

    const winner_odd = data.bookmakers[0].bets[0].values
    const winner_home_odd = winner_odd[0].odd
    const winner_away_odd = winner_odd[2].odd

    const double_chance_odd = data.bookmakers[0].bets[15].values
    const double_chance_home_odd = double_chance_odd[0].odd
    const double_chance_away_odd = double_chance_odd[2].odd

    const goals_over_under_odds = data.bookmakers[0].bets[4].values

    // Guad clause if no advice available
    if (advice === "No predictions available") return 1

    const [ predictions, prediction_details ] = advice.split(' : ').map((str) => str.trim())

    // Winner
    if (predictions === "Winner") {

        return get_winner_odds(prediction_details, home_team, winner_home_odd, winner_away_odd)

    // Double Chance
    } else if (predictions === "Double chance") {

        return get_double_chance_odds(prediction_details, home_team, double_chance_home_odd, double_chance_away_odd)
    
    // Combos
    } else {

        const [team, over_under] = prediction_details.split(' and ').map((str) => str.trim())

        // Combo Winner
        if (predictions === "Combo Winner") {

            const winner_odds = get_winner_odds(team, home_team, winner_home_odd, winner_away_odd)
            const over_under_odds = get_over_under_odds(over_under, goals_over_under_odds)

            return (winner_odds * over_under_odds).toFixed(2)

        // Combo Double Chance
        } else {

            const over_under_odds = get_over_under_odds(over_under, goals_over_under_odds)
            const double_chance_odds = get_double_chance_odds(team, home_team, double_chance_home_odd, double_chance_away_odd)

            return (double_chance_odds * over_under_odds).toFixed(2)

        }

    }
    
}