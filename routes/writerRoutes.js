const express = require("express");
const router = express.Router();
const witersController=require("../Controller/witersController");
const multer  = require('multer')
const {storage}=require("../CloudConfig");
const upload = multer({ storage });

router.route("/").get(witersController.getWriters);
router.route("/new").get(witersController.createWritersForm);
router.route("/").post(upload.single('image'),witersController.createWriter);
router.route("/:id").delete(witersController.destroyWriter)
module.exports = router;