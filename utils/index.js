export function parseEndorsementPolicy(type, policy) {
  return buildPolicy(type, policy);
}

function buildPolicy(type, policy) {
  return type + '(' + policy.map(x => "'" + x + "'") + ')';
}
