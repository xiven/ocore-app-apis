import { success, failure } from '../../libs/response-lib';
import Transaction from '../../models/Transaction';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let transaction = await Transaction.findOne({
      transactionType: event.pathParameters.transactionType
    });
    if (!transaction)
      return failure({ status: false, error: 'Transaction not found' });
    transaction = await Transaction.findByIdAndRemove(transaction.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
