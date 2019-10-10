import { success, failure } from '../../libs/response-lib';
import Channel from '../../models/Channel';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let channel = await Channel.findOne({
      name: event.pathParameters.name
    });
    if (!channel) return failure({ status: false, error: 'Channel not found' });
    channel = await Channel.findByIdAndRemove(channel.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
