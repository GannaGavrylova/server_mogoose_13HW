import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Publisher } from "./models/Publisher.js";
import { Magazine } from "./models/Magazine.js";
import { Article } from "./models/Article.js";
import { Tag } from "./models/Tag.js";

const app = express();
const port = process.env.PORT || 3333;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

connectDB();

async function createData() {
  try {
    const publisher = new Publisher({
      name: "Hearst Corporation",
      location: {
        city: "New York",
        country: "USA",
      },
    });
    await publisher.save();
    console.log(`Publisher was successfully created ${publisher.name}`);

    const magazine = new Magazine({
      title: "Cosmopolitan",
      issueNumber: 2,
      publisher: publisher._id,
    });
    await magazine.save();

    const article = new Article({
      title: " Gute Rezept",
      content: "zutaten: 250g Melch, 200g Milch and weiter",
    });
    await article.save();
    const tag = new Tag({
      name: "Koch",
      articles: [article._id], // Привязываем статью к тегу
    });
    await tag.save();
    // Обновляем статью, чтобы привязать тег
    article.tags.push(tag._id);
    await article.save();

    console.log("Data created successfully!");
  } catch (error) {
    console.error(`Not connected ${error}`);
  }
}
createData();

app.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("tags"); // отправить клиенту связанные данные
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id).populate("articles"); // маршрута для получения тега со статьями
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
