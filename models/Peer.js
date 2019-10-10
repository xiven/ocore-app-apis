import mongoose from 'mongoose';

const PeerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  peerUrl: {
    type: String,
    required: true
  },
  eventUrl: {
    type: String,
    required: true
  },
  endorsingPeer: {
    type: Boolean,
    required: true
  },
  chaincodeQuery: {
    type: Boolean,
    required: true
  },
  ledgerQuery: {
    type: Boolean,
    required: true
  },
  eventSource: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('peer', PeerSchema);
