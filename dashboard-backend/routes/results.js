import express from "express";
import getResults from '../controllers/results/get.js';

const Router = express.Router();

Router.get('/',getResults);

export default Router;