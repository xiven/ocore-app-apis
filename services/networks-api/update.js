import { success, failure } from '../../libs/response-lib';
import Network from '../../models/Network';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { peers, orderers, cas, applications } = JSON.parse(event.body);
  const networkFields = {};
  if (peers) networkFields.peers = peers;
  if (orderers) networkFields.orderers = orderers;
  if (cas) networkFields.cas = cas;
  if (applications) networkFields.applications = applications;

  try {
    let network = await Network.findOne({
      name: event.pathParameters.name
    });
    if (!network) return failure({ status: false, error: 'Network not found' });
    network = await Network.findByIdAndUpdate(
      network.id,
      { $set: networkFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
