import express from "express";
import scraper from "../controllers/scraper/scrape.js";

const router = express.Router();

router.post('/',scraper);

export default router;