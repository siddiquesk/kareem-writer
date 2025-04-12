const express = require("express");
const router = express.Router();
const contactController=require("../Controller/contactController");

router.route("/").get(contactController.getFormContact);
router.route("/").post(contactController.createContact);
router.route("/show").get(contactController.showContact);
router.route("/delete/:id").delete(contactController.destroyContact);


module.exports = router;


