import { success, failure } from '../../libs/response-lib';
import CA from '../../models/CA';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let ca = await CA.findOne({
      name: event.pathParameters.name
    });
    if (!ca) return failure({ status: false, error: 'CA not found' });
    ca = await CA.findByIdAndRemove(ca.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
