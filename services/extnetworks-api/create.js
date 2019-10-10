import { success, failure } from '../../libs/response-lib';
import ExtNetwork from '../../models/ExtNetwork';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { name, url } = JSON.parse(event.body);

  const item = {
    name,
    url
  };
  const newExtNetwork = new ExtNetwork(item);

  try {
    const extNetwork = await newExtNetwork.save();
    return success(extNetwork);
  } catch (e) {
    return failure({ status: false });
  }
}
