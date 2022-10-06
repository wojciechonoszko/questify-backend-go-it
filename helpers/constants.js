const PRODUCTION_URL = "https://localhost:8155";
const EMAIL_TO_VERIFY = "wojciechonoszko@gmail.com";

const SALT_FACTOR = 6;

const Difficulty = {
  EASY: "easy",
  NORMAL: "normal",
  HARD: "hard",
};

const Category = {
  STUFF: "stuff",
  FAMILY: "family",
  HEALTH: "health",
  LEARNING: "learning",
  LEISURE: "leisure",
  WORK: "work",
};

module.exports = {
  SALT_FACTOR,
  PRODUCTION_URL,
  EMAIL_TO_VERIFY,
  Difficulty,
  Category,
};
