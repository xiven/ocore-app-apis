import { success, failure } from '../../libs/response-lib';
import Organization from '../../models/Organization';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await Organization.find({ name: event.pathParameters.name });
    if (result.length > 0) {
      // Return the retrieved item
      return success(result);
    } else {
      return failure({ status: false, error: 'Organization not found.' });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
