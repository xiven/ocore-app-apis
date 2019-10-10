import { success, failure } from '../../libs/response-lib';
import ExtNetwork from '../../models/ExtNetwork';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await ExtNetwork.find();
    // Return the matching list of items in response body
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
