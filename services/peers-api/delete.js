import { success, failure } from '../../libs/response-lib';
import Peer from '../../models/Peer';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let peer = await Peer.findOne({
      name: event.pathParameters.name
    });
    if (!peer) return failure({ status: false, error: 'Peer not found' });
    peer = await Peer.findByIdAndRemove(peer.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
