import { success, failure } from '../../libs/response-lib';
import ExtNetwork from '../../models/ExtNetwork';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let extNetwork = await ExtNetwork.findOne({
      name: event.pathParameters.name
    });
    if (!extNetwork)
      return failure({ status: false, error: 'ExtNetwork not found' });
    extNetwork = await ExtNetwork.findByIdAndRemove(extNetwork.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
