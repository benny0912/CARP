const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const mongoose = require('mongoose');
const Case = require('../models/cases');

// Controllers
const CaseController = require('../controllers/cases');

// GET ALL Cases Route
router.get('/', checkAuth, CaseController.case_get_all);

// GET Case Details by case id Route
router.get('/caseid', checkAuth, CaseController.case_get_by_case_id);

// GET Case Details by number Route
router.get('/number', checkAuth, CaseController.case_get_by_case_number);

// GET Case Details by case title Route
router.get('/title', checkAuth, CaseController.case_get_by_case_title);

// Create New Case Route
router.post('/create', checkAuth, CaseController.case_create_new_case);

// Update Existing Case Route
router.patch('/update', checkAuth, CaseController.case_update_case);

// Delete Existing Case Route
router.delete('/delete', checkAuth, CaseController.case_delete_case);

module.exports = router;