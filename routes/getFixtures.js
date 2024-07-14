const db = require('../db/db')

module.exports = async (req, res) => {
    const teamIds = req.body.teams
    const response = await db.getDataByTeamIds(teamIds)
    res.json(response)
}