const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employerController");

router
  .route("/")
  .get(employeeController.getAllEmployee)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
