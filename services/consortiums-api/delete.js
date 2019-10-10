import { success, failure } from '../../libs/response-lib';
import Consortium from '../../models/Consortium';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let consortium = await Consortium.findOne({
      name: event.pathParameters.name
    });
    if (!consortium)
      return failure({ status: false, error: 'Consortium not found' });
    consortium = await Consortium.findByIdAndRemove(consortium.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
