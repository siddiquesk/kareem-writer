const express = require("express");
const router = express.Router();
const witersController=require("../Controller/witersController");
const multer  = require('multer')
const {storage}=require("../CloudConfig");
const upload = multer({ storage });
router.route("/").get(witersController.getWiters);
router.route("/new").get(witersController.cretaeWitersForm);
router.route("/").post(upload.single('image'),witersController.createAllWriter);
router.route("/:id").delete(witersController.destroyWriters)
module.exports = router;