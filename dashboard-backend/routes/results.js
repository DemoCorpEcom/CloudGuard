import express from "express";
import getResults from '../controllers/results/get.js';
import postResult from "../controllers/results/post.js";

const Router = express.Router();

Router.get('/',getResults);
Router.post('/',postResult);

export default Router;