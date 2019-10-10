import { success, failure } from '../../libs/response-lib';
import Channel from '../../models/Channel';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await Channel.find({ name: event.pathParameters.name });
    if (result.length > 0) {
      // Return the retrieved item
      return success(result);
    } else {
      return failure({ status: false, error: 'Channel not found.' });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
