const { get_team_fixture } = require('./get_fixture');
const { storeData, deleteData } = require('../db/db');

const fetchFixtures = async (teamIds) => {
    try {
        let fixtures = []
        for (let id of teamIds) {
            fixtures.push(await get_team_fixture(id))
        }
        return fixtures
    } catch (error) {
        console.error('Error fetching data from API:', error)
        throw error
    }
}

const saveFixtures = async (fixtures) => {
    try {
        await storeData(fixtures)
    } catch (error) {
        console.error('Error fetching data from API:', error)
        throw error
    }
}

const runIngestion = async (teamIds) => {
    try {
        await deleteData()
        const fixtures = await fetchFixtures(teamIds)
        await saveFixtures(fixtures)
        console.log(fixtures)
    } catch (error) {
        console.error('Error running ingestion:', error)
        throw error
    }
}

module.exports = {
    runIngestion
}