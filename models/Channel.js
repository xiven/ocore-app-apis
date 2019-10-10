import mongoose from 'mongoose';

const ChannelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  chaincodes: {
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

export default mongoose.model('channel', ChannelSchema);
