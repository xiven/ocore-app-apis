import { success, failure } from '../../libs/response-lib';
import Network from '../../models/Network';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { name, peers, orderers, cas, applications } = JSON.parse(event.body);

  const item = {
    name,
    peers,
    orderers,
    cas,
    applications
  };
  const newNetwork = new Network(item);

  try {
    const network = await newNetwork.save();
    return success(network);
  } catch (e) {
    return failure({ status: false });
  }
}
