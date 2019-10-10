import { success, failure } from '../../libs/response-lib';
import Organization from '../../models/Organization';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();

  try {
    let organization = await Organization.findOne({
      name: event.pathParameters.name
    });
    if (!organization)
      return failure({ status: false, error: 'Organization not found' });
    organization = await Organization.findByIdAndRemove(organization.id);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
