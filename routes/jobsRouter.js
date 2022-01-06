import express from 'express';
const router = express.Router();

import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobsController.js';

router.route('/').post(createJob).get(getAllJobs);
router.get('/stats', showStats);

// remember to place :id in the end !
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;
