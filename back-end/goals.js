const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const goalSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    goal: String,
    description: String,
    dateToComplete: String,
    completed: Boolean,
    created: {
      type: Date,
      default: Date.now
    },
  });
  
const Goal = mongoose.model('Goal', goalSchema);

// upload goal
router.post("/", validUser, async (req, res) => {
    const goal = new Goal({
      user: req.user,
      goal: req.body.goal,
      description: req.body.description,
      dateToComplete: req.body.dateToComplete,
      completed: req.body.completed,
    });
    try {
      await goal.save();
      return res.send({
        goal: goal
      });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get my goals
router.get("/", validUser, async (req, res) => {
    // return goals
    try {
      let goals = await Goal.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(goals);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.put("/:id", validUser, async (req, res) => {
  try{
    let editGoal = await Goal.findOne({
      _id: req.params.id
    });
    editGoal.goal = req.body.goal,
    editGoal.description = req.body.description,
    editGoal.dateToComplete = req.body.dateToComplete,
    editGoal.save();
    res.sendStatus(200);
  } catch (error){
    res.sendStatus(500);
  }
});

router.delete('/:id', validUser, async (req, res) => {
  try{
    await Goal.deleteOne({
      id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


module.exports = {
  model: Goal,
  routes: router,
}