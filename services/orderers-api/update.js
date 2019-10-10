import { success, failure } from '../../libs/response-lib';
import Orderer from '../../models/Orderer';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { url } = JSON.parse(event.body);
  const ordererFields = {};
  if (url) ordererFields.url = url;

  try {
    let orderer = await Orderer.findOne({
      name: event.pathParameters.name
    });
    if (!orderer) return failure({ status: false, error: 'Orderer not found' });
    orderer = await Orderer.findByIdAndUpdate(
      orderer.id,
      { $set: ordererFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
