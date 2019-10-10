import { success, failure } from '../../libs/response-lib';
import Application from '../../models/Application';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let application = await Application.findOne({
      name: event.pathParameters.name
    });
    if (!application)
      return failure({ status: false, error: 'Application not found' });
    application = await Application.findByIdAndRemove(application.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
