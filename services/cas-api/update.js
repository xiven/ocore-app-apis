import { success, failure } from '../../libs/response-lib';
import CA from '../../models/CA';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { url } = JSON.parse(event.body);
  const caFields = {};
  if (url) caFields.url = url;

  try {
    let ca = await CA.findOne({
      name: event.pathParameters.name
    });
    if (!ca) return failure({ status: false, error: 'CA not found' });
    ca = await CA.findByIdAndUpdate(ca.id, { $set: caFields }, { new: true });
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
