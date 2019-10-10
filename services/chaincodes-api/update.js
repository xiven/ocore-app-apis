import { success, failure } from '../../libs/response-lib';
import Chaincode from '../../models/Chaincode';
import { connectDB } from '../../config/db';
import { parseEndorsementPolicy } from '../../utils/index';

export async function main(event, context) {
  connectDB();
  const { key, version, path, admins, endorsementType, policy } = JSON.parse(
    event.body
  );
  const chaincodeFields = {};
  if (key) chaincodeFields.key = key;
  if (version) chaincodeFields.version = version;
  if (path) chaincodeFields.path = path;
  if (admins) chaincodeFields.admins = admins;
  const endorsementPolicy = parseEndorsementPolicy(endorsementType, policy);
  if (endorsementPolicy) chaincodeFields.endorsementPolicy = endorsementPolicy;

  try {
    let chaincode = await Chaincode.findOne({
      name: event.pathParameters.name
    });
    if (!chaincode)
      return failure({ status: false, error: 'Chaincode not found' });
    chaincode = await Chaincode.findByIdAndUpdate(
      chaincode.id,
      { $set: chaincodeFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
