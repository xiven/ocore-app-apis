import { success, failure } from '../../libs/response-lib';
import ExtNetwork from '../../models/ExtNetwork';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { url } = JSON.parse(event.body);
  const extNetworkFields = {};
  if (url) extNetworkFields.url = url;

  try {
    let extNetwork = await ExtNetwork.findOne({
      name: event.pathParameters.name
    });
    if (!extNetwork)
      return failure({ status: false, error: 'ExtNetwork not found' });
    extNetwork = await ExtNetwork.findByIdAndUpdate(
      extNetwork.id,
      { $set: extNetworkFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
