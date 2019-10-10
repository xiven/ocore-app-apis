import mongoose from 'mongoose';

const ExtNetworkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('extNetwork', ExtNetworkSchema);
