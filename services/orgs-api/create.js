import { success, failure } from '../../libs/response-lib';
import Organization from '../../models/Organization';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  connectDB();

  const { name, mspId, url, cas } = JSON.parse(event.body);

  const item = {
    name,
    mspId,
    url,
    cas
  };
  const newOrganization = new Organization(item);

  try {
    const organization = await newOrganization.save();
    return success(organization);
  } catch (e) {
    return failure({ status: false });
  }
}
