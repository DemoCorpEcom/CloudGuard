import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    commitId: String,
    vulnerability: String,
    vulId: Number,
    affectedUrl: String,
    severity: String,
})

const ScanResults = mongoose.model("scanresults", resultSchema);

export default ScanResults;