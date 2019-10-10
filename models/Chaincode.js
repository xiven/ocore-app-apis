import mongoose from 'mongoose';

const ChaincodeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  admins: {
    type: [String],
    required: true
  },
  applications: {
    type: [String],
    required: true
  },
  endorsementPolicy: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('chaincode', ChaincodeSchema);
