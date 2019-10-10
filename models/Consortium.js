import mongoose from 'mongoose';

const ConsortiumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  admin: {
    type: String,
    required: true
  },
  network: {
    type: String,
    required: true
  },
  chaincodes: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('consortium', ConsortiumSchema, 'consortiums');
