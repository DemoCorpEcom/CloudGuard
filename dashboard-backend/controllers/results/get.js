import mongoose from "mongoose";
import ScanResults from "../../models/results.js";

const getResults = async (req, res) => {
    try {
        const results = await ScanResults.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default getResults;