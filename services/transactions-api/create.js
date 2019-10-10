import { success, failure } from '../../libs/response-lib';
import Transaction from '../../models/Transaction';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { transactionType, payor, payee, ecom } = JSON.parse(event.body);

  const item = {
    transactionType,
    payor,
    payee,
    ecom
  };
  const newTransaction = new Transaction(item);

  try {
    const transaction = await newTransaction.save();
    return success(transaction);
  } catch (e) {
    return failure({ status: false });
  }
}
