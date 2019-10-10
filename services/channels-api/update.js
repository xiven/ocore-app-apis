import { success, failure } from '../../libs/response-lib';
import Channel from '../../models/Channel';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { chaincodes, applications } = JSON.parse(event.body);
  const channelFields = {};
  if (chaincodes) channelFields.chaincodes = chaincodes;
  if (applications) channelFields.applications = applications;

  try {
    let channel = await Channel.findOne({
      name: event.pathParameters.name
    });
    if (!channel) return failure({ status: false, error: 'Channel not found' });
    channel = await Channel.findByIdAndUpdate(
      channel.id,
      { $set: channelFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
