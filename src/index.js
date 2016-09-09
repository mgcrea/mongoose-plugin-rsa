import Promise from 'bluebird';
import {pki} from 'node-forge';

Promise.promisifyAll(pki.rsa);

export default function rsaPlugin(schema, {privateKeyField = 'privateKey', publicKeyField = 'publicKey'}) {
  // Prepare schema to store keys
  schema.add({
    [privateKeyField]: {type: String, required: false, select: false},
    [publicKeyField]: {type: String, required: false}
  });
  // Actually create RSA keys on save
  schema.pre('save', function preSave(next) {
    if (!this.isNew) {
      return null;
    }
    // Generate device certificate
    return generateFastKeyPairAsync({bits: 2048})
      .then(({privateKey, publicKey}) => {
        this[privateKeyField] = pki.privateKeyToPem(privateKey);
        this[publicKeyField] = pki.publicKeyToPem(publicKey);
      })
      .then(next)
      .catch(next);
  });
  // if (options && options.index) {
  //   schema.path('lastMod').index(options.index)
  // }
}

export function generateFastKeyPairAsync({bits = 2048, exponent = 65537}) {
  try {
    // Try to generate an RSA key pair using ursa native fast path
    const keyPair = require('ursa'); // eslint-disable-line
    keyPair.generatePrivateKey(bits, exponent);
    return Promise.resolve({
      privateKey: pki.privateKeyFromPem(keyPair.toPrivatePem().toString()),
      publicKey: pki.publicKeyFromPem(keyPair.toPublicPem().toString())
    });
  } catch (err) {
    // Fallback to js-only slow path
    return pki.rsa.generateKeyPairAsync({bits, workers: -1});
  }
}
