import mongoose from 'mongoose';

const ApplicationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  transactions: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('application', ApplicationSchema);
