import mongoose from 'mongoose';

const NetworkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  peers: {
    type: [String],
    required: true
  },
  orderers: {
    type: [String],
    required: true
  },
  cas: {
    type: [String],
    required: true
  },
  applications: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('network', NetworkSchema);
