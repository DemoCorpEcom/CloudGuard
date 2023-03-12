import ScanResults from "../../models/results.js";
import lodash from 'lodash';

const getResults = async (req, res) => {
    try {
        const results = await ScanResults.find();
        const groupedResults = lodash.groupBy(results,'commitId');
        let groupedResultsByVulId  = {};

        for(const [commitId, group] of Object.entries(groupedResults)){
            const vulbyId = lodash.groupBy(group,'vulId');
            groupedResultsByVulId[commitId] = vulbyId;
        }

        res.status(200).json(groupedResultsByVulId);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default getResults;