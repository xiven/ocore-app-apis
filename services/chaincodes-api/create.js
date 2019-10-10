import { success, failure } from '../../libs/response-lib';
import Chaincode from '../../models/Chaincode';
import { connectDB } from '../../config/db';
import { parseEndorsementPolicy } from '../../utils/index';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const {
    name,
    key,
    version,
    path,
    admins,
    applications,
    endorsementType,
    policy
  } = JSON.parse(event.body);

  const item = {
    name,
    key,
    version,
    path,
    admins,
    applications,
    endorsementPolicy: parseEndorsementPolicy(endorsementType, policy)
  };
  const newChaincode = new Chaincode(item);

  try {
    const chaincode = await newChaincode.save();
    return success(chaincode);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
