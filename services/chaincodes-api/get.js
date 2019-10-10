import { success, failure } from '../../libs/response-lib';
import Chaincode from '../../models/Chaincode';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await Chaincode.find({ name: event.pathParameters.name });
    if (result.length > 0) {
      // Return the retrieved item
      return success(result);
    } else {
      return failure({ status: false, error: 'Chaincode not found.' });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
