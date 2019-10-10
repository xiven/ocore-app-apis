import { success, failure } from '../../libs/response-lib';
import Channel from '../../models/Channel';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await Channel.find();
    // Return the matching list of items in response body
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
