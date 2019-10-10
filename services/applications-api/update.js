import { success, failure } from '../../libs/response-lib';
import Application from '../../models/Application';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { name, transactions } = JSON.parse(event.body);
  const applicationFields = {};
  if (name) applicationFields.name = name;
  if (transactions) applicationFields.transactions = transactions;

  try {
    let application = await Application.findOne({
      name: event.pathParameters.name
    });
    if (!application)
      return failure({ status: false, error: 'Application not found' });
    application = await Application.findByIdAndUpdate(
      application.id,
      { $set: applicationFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
