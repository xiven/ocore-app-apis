import mongoose from 'mongoose';

const TransactionSchema = mongoose.Schema({
  transactionType: {
    type: String,
    required: true
  },
  payor: {
    type: String,
    required: true
  },
  payee: {
    type: String,
    required: true
  },
  ecom: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('transaction', TransactionSchema);
