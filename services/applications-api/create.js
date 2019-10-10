import { success, failure } from '../../libs/response-lib';
import Application from '../../models/Application';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { name, transactions } = JSON.parse(event.body);

  const item = {
    name,
    transactions
  };
  const newApplication = new Application(item);

  try {
    const application = await newApplication.save();
    return success(application);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
