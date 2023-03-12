import ScanResults from "../../models/results.js";

const postResult = async (req, res) => {
    const data = req.body;
    const newItem = new ScanResults(data);
    try {
        await newItem.save();
        res.status(200).json(newItem);
    } catch (e) {
        res.status(500).json(e);
    }
}

export default postResult;