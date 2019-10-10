import { success, failure } from '../../libs/response-lib';
import Network from '../../models/Network';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let network = await Network.findOne({
      name: event.pathParameters.name
    });
    if (!network) return failure({ status: false, error: 'Network not found' });
    network = await Network.findByIdAndRemove(network.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
