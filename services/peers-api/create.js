import { success, failure } from '../../libs/response-lib';
import Peer from '../../models/Peer';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const {
    name,
    peerUrl,
    eventUrl,
    endorsingPeer,
    chaincodeQuery,
    ledgerQuery,
    eventSource
  } = JSON.parse(event.body);

  const item = {
    name,
    peerUrl,
    eventUrl,
    endorsingPeer,
    chaincodeQuery,
    ledgerQuery,
    eventSource
  };
  const newPeer = new Peer(item);

  try {
    const peer = await newPeer.save();
    return success(peer);
  } catch (e) {
    return failure({ status: false });
  }
}
