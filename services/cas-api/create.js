import { success, failure } from '../../libs/response-lib';
import CA from '../../models/CA';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { name, url } = JSON.parse(event.body);

  const item = {
    name,
    url
  };
  const newCA = new CA(item);

  try {
    const ca = await newCA.save();
    return success(ca);
  } catch (e) {
    return failure({ status: false });
  }
}
