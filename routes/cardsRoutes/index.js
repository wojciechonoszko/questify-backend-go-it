const express = require("express");
const router = express.Router();
const {
  listCards,
  getCardById,
  removeCard,
  addCard,
  updateCard,
  updateStatusCard,
} = require("../../controllers/cards");
const {
  validateCreateCard,
  validateUpdateCard,
  validateUpdateChallenge,
  validateUpdateComplete,
  validateQueryCard,
  validateObjectId,
} = require("../../validation/cards");
// const guard = require("../../helpers/guard");

router.patch(
  "/:cardId/challenge",
  [ validateObjectId, validateUpdateChallenge],
  updateStatusCard
);
router.patch(
  "/:cardId/complete",
  [ validateObjectId, validateUpdateComplete],
  updateStatusCard
);

router.put(
  "/:cardId",
  [ validateObjectId, validateUpdateCard],
  updateCard
);

router.post("/",  validateCreateCard, addCard);

router.get("/",  validateQueryCard, listCards);
router.get("/:cardId",  validateObjectId, getCardById);

router.delete("/:cardId",  validateObjectId, removeCard);

module.exports = router;
