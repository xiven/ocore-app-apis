import { success, failure } from '../../libs/response-lib';
import Channel from '../../models/Channel';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { name, chaincodes, applications } = JSON.parse(event.body);

  const item = {
    name,
    chaincodes,
    applications
  };
  const newChannel = new Channel(item);

  try {
    const channel = await newChannel.save();
    return success(channel);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
