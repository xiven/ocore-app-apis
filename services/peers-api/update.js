import { success, failure } from '../../libs/response-lib';
import Peer from '../../models/Peer';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const {
    peerUrl,
    eventUrl,
    endorsingPeer,
    chaincodeQuery,
    ledgerQuery,
    eventSource
  } = JSON.parse(event.body);
  const peerFields = {};
  if (peerUrl) peerFields.peerUrl = peerUrl;
  if (eventUrl) peerFields.eventUrl = eventUrl;
  if (endorsingPeer) peerFields.endorsingPeer = endorsingPeer;
  if (chaincodeQuery) peerFields.chaincodeQuery = chaincodeQuery;
  if (ledgerQuery) peerFields.ledgerQuery = ledgerQuery;
  if (eventSource) peerFields.eventSource = eventSource;

  try {
    let peer = await Peer.findOne({
      name: event.pathParameters.name
    });
    if (!peer) return failure({ status: false, error: 'Peer not found' });
    peer = await Peer.findByIdAndUpdate(
      peer.id,
      { $set: peerFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
