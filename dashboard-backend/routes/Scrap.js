import express from "express";
import scraper from "../controllers/scraper/scrape.js";

const router = express.Router();

router.get('/',scraper);

export default router;