const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const multer = require("multer");
const path = require("path");
const axios = require("axios"); 

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Create
router.post("/", upload.single("profileImage"), async (req, res) => {
  try {
    const member = new Member({
      ...req.body,
      profileImage: req.file ? req.file.filename : "",
    });
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to add member", error: err });
  }
});

// Read all
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch members" });
  }
});

// Read one
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.json(member);
  } catch (err) {
    res.status(404).json({ message: "Member not found" });
  }
});

// Update
router.put("/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };
    if (req.file) {
      updatedData.profileImage = req.file.filename;
    }

    const member = await Member.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to update member" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete member" });
  }
});

module.exports = router;
