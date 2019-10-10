import { success, failure } from '../../libs/response-lib';
import Consortium from '../../models/Consortium';
import { connectDB } from '../../config/db';

export async function main(event, context) {
  connectDB();
  const { domain, admin, network, chaincodes } = JSON.parse(event.body);
  const consortiumFields = {};
  if (domain) consortiumFields.domain = domain;
  if (admin) consortiumFields.admin = admin;
  if (network) consortiumFields.network = network;
  if (chaincodes) consortiumFields.chaincodes = chaincodes;

  try {
    let consortium = await Consortium.findOne({
      name: event.pathParameters.name
    });
    if (!consortium)
      return failure({ status: false, error: 'Consortium not found' });
    consortium = await Consortium.findByIdAndUpdate(
      consortium.id,
      { $set: consortiumFields },
      { new: true }
    );
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
