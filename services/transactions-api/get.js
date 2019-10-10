import { success, failure } from '../../libs/response-lib';
import Transaction from '../../models/Transaction';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    const result = await Transaction.find({
      transactionType: event.pathParameters.transactionType
    });
    if (result.length > 0) {
      // Return the retrieved item
      return success(result);
    } else {
      return failure({ status: false, error: 'Transaction not found.' });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
