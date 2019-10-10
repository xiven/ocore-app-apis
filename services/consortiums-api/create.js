import { success, failure } from '../../libs/response-lib';
import Consortium from '../../models/Consortium';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { name, domain, admin, network, chaincodes } = JSON.parse(event.body);

  const item = {
    name,
    domain,
    admin,
    network,
    chaincodes
  };
  const newConsortium = new Consortium(item);

  try {
    const consortium = await newConsortium.save();
    return success(consortium);
  } catch (e) {
    return failure({ status: false });
  }
}
