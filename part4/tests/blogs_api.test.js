const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "EuropeanDance",
    author: "Boa Ragno",
    url: "www.tektonik.com",
    likes: 0,
  },
  {
    title: "MortiDiFame",
    author: "Giustiziere Maskerato",
    url: "www.maledettiiiiii.com",
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let newBlog = new Blog(initialBlogs[0]);
  await newBlog.save();
  newBlog = new Blog(initialBlogs[1]);
  await newBlog.save();
});

test("GET to /api/blogs returns blogs as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("GET to /api/blogs return correct blogs number", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length);
});
