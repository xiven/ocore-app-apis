import { success, failure } from '../../libs/response-lib';
import Transaction from '../../models/Transaction';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { payor, payee, ecom } = JSON.parse(event.body);
  const transactionFields = {};
  if (payor) transactionFields.payor = payor;
  if (payee) transactionFields.payee = payee;
  if (ecom) transactionFields.ecom = ecom;

  try {
    let transaction = await Transaction.findOne({
      transactionType: event.pathParameters.transactionType
    });
    if (!transaction)
      return failure({ status: false, error: 'Transaction not found' });
    transaction = await Transaction.findByIdAndUpdate(
      transaction.id,
      { $set: transactionFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
