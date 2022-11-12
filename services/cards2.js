const { httpStatusCodes } = require("../helpers/httpstatuscodes");
const Card = require("../schemas/card");

async function getAllCards(data) {
  try {
    const result = await Card.find(data); /* .populate("owner") */
    console.log("Getting All todos...");
    return result;
  } catch (error) {
      console.error(error);
  }
}

module.exports = {
  getAllCards,
};
