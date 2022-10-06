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


/**
 * @swagger
 * /:cardId/challenge:
 *  patch:
 *    summary: Update the task by the id
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The task was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: The task was not found
 *      500:
 *        description: Some error happened
 */
router.patch(
  "/:cardId/challenge",
  [ validateObjectId, validateUpdateChallenge],
  updateStatusCard
);


/**
 * @swagger
 * /:cardId/complete:
 *  patch:
 *    summary: Update the task by the id
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The task was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: The task was not found
 *      500:
 *        description: Some error happened
 */
router.patch(
  "/:cardId/complete",
  [ validateObjectId, validateUpdateComplete],
  updateStatusCard
);


/**
 * @swagger
 * /task/{id}:
 *  put:
 *    summary: Update the task by the id
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The task was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: The task was not found
 *      500:
 *        description: Some error happened
 */
router.put(
  "/:cardId",
  [ validateObjectId, validateUpdateCard],
  updateCard
);

/**
 * @swagger
 * /task/add:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Some server error
 */
router.post("/", validateCreateCard, addCard);


/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - task
 *         - data
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         card:
 *           type: string
 *           description: The card
 *         type:
 *           type: string
 *           description: The card type
 *         data:
 *           type: string
 *           description: The card data
 *         difficulty:
 *           type: booleon
 *           description: The card difficulty
 *         favorite:
 *           type: booleon
 *           description: Is card is favorite
 *         done:
 *           type: booleon
 *           description: Is task is done
 *         isChallenge:
 *           type: booleon
 *           description: Is task is challenge
 *       example:
 *         card: Do homework
 *         type: Stuff
 *         data: 2022-02-11
 *         difficulty: Normal
 *         favorite: true
 *         done: false
 *         challenge: true
 */

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: The task managing API
 */
/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the list of all the cards
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: The list of the cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/card'
 */
router.get("/", validateQueryCard, listCards);

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get the task by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: The task was not found
 */
router.get("/:cardId",  validateObjectId, getCardById);


/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 */
router.delete("/:cardId",  validateObjectId, removeCard);

module.exports = router;
