
const get_winner_odds = (prediction_details, home_team, winner_home_odd, winner_away_odd) => {

    if(prediction_details.trim() === home_team.trim()) {
        return winner_home_odd
    } else {
        return winner_away_odd
    }
}

const get_double_chance_odds = (prediction_details, home_team, double_chance_home_odd, double_chance_away_odd) => {
    
    const [pred_str_1, pred_str_2] = prediction_details.split(' or ').map((str) => str.trim())

        if (pred_str_1 === home_team) {
            return double_chance_home_odd
        } else {
            return double_chance_away_odd
        }
}

const get_over_under_odds = (over_under, goals_over_under_odds) => {

    const [number_of_goals, str_2] = over_under.split(' ')

        const switchcases = {
            '+3.5': goals_over_under_odds[0].odd,
            '-3.5': goals_over_under_odds[1].odd,
            '+1.5': goals_over_under_odds[2].odd,
            '-1.5': goals_over_under_odds[3].odd,
            '+4.5': goals_over_under_odds[4].odd,
            '-4.5': goals_over_under_odds[5].odd,
            '+2.5': goals_over_under_odds[6].odd,
            '-2.5': goals_over_under_odds[7].odd,
            '+0.5': goals_over_under_odds[8].odd,
            '-0.5': goals_over_under_odds[9].odd,
        }

    return switchcases[number_of_goals]
}

module.exports = { 
    get_winner_odds, 
    get_double_chance_odds, 
    get_over_under_odds 
}