import { success, failure } from '../../libs/response-lib';
import Chaincode from '../../models/Chaincode';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await Chaincode.find();
    // Return the matching list of items in response body
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
