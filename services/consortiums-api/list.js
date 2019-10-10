import { success, failure } from '../../libs/response-lib';
import Consortium from '../../models/Consortium';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await Consortium.find();
    // Return the matching list of items in response body
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
