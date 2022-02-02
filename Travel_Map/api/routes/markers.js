const router = require("express").Router();
const Marker = require("../models/Marker");

//create a marker
router.post("/add", async (req, res) => {
    const newMarker = new Marker(req.body);
    try {
        const savedMarker = await newMarker.save();
        res.status(200).json(savedMarker);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all pins
router.get("/get/all", async (req, res) => {
    try {
        const markers = await Marker.find();
        res.status(200).json(markers);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;