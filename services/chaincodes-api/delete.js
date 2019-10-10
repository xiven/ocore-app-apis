import { success, failure } from '../../libs/response-lib';
import Chaincode from '../../models/Chaincode';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let chaincode = await Chaincode.findOne({
      name: event.pathParameters.name
    });
    if (!chaincode)
      return failure({ status: false, error: 'Chaincode not found' });
    chaincode = await Chaincode.findByIdAndRemove(chaincode.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
