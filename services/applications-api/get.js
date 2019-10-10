import { success, failure } from '../../libs/response-lib';
import Application from '../../models/Application';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await Application.find({ name: event.pathParameters.name });
    if (result) {
      // Return the retrieved item
      return success(result);
    } else {
      return failure({ status: false, error: 'Application not found.' });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
