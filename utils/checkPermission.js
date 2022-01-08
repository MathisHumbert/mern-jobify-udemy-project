import { UnAuthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, ressourceUserID) => {
  if (requestUser.userID === ressourceUserID.toString()) return;
  throw new UnAuthenticatedError('Not authorized to access this route');
};

export default checkPermissions;
