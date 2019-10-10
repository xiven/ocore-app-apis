import { success, failure } from '../../libs/response-lib';
import Orderer from '../../models/Orderer';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { name, url } = JSON.parse(event.body);

  const item = {
    name,
    url
  };
  const newOrderer = new Orderer(item);

  try {
    const orderer = await newOrderer.save();
    return success(orderer);
  } catch (e) {
    return failure({ status: false });
  }
}
