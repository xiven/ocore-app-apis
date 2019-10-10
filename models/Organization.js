import mongoose from 'mongoose';

const OrganizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mspId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  cas: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('organization', OrganizationSchema);
