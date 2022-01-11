import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermission.js';
import mongoose from 'mongoose';

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }

  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  const { id: jobID } = req.params;
  const { company, position } = req.body;
  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }

  const job = await Job.findOne({ _id: jobID });
  if (!job) {
    throw new NotFoundError(`No job with id: ${id}`);
  }
  // check permissions between userID and createdBy => userID
  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobID } = req.params;

  const job = await Job.findOne({ _id: jobID });
  if (!job) {
    throw new NotFoundError(`No job with id: ${id}`);
  }
  checkPermissions(req.user, job.createdBy);

  await job.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) } },
  ]);
  res.status(StatusCodes.OK).json({ stats });
  res.send('show stats');
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
