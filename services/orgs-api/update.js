import { success, failure } from '../../libs/response-lib';
import Organization from '../../models/Organization';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { mspId, url, cas } = JSON.parse(event.body);
  const organizationFields = {};
  if (mspId) organizationFields.mspId = mspId;
  if (url) organizationFields.url = url;
  if (cas) organizationFields.cas = cas;

  try {
    let organization = await Organization.findOne({
      name: event.pathParameters.name
    });
    if (!organization)
      return failure({ status: false, error: 'Organization not found' });
    organization = await Organization.findByIdAndUpdate(
      organization.id,
      { $set: organizationFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
