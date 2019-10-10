import { success, failure } from '../../libs/response-lib';
import Orderer from '../../models/Orderer';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let orderer = await Orderer.findOne({
      name: event.pathParameters.name
    });
    if (!orderer) return failure({ status: false, error: 'Orderer not found' });
    orderer = await Orderer.findByIdAndRemove(orderer.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
