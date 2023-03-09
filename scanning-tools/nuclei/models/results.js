import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    commitId: String,
    vulnerability: String,
    affectedUrl: String,
    severity: String,
})

const ResultModel = mongoose.model(resultSchema, "ResultModel");

export default ResultModel;