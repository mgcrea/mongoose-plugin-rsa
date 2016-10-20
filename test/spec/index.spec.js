
import expect from 'expect';
import mongoose from 'mongoose';

import testSchema from './../fixtures/schema';
import encodeKeysPlugin from './../../src';
import pkg from './../../package.json';

describe('Plugin', () => {
  const mongoUri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/test-${pkg.name}`;
  mongoose.set('debug', true);
  const db = mongoose.createConnection(mongoUri);
  const Model = db.model('Foo', testSchema);

  beforeEach(() => Promise.all([
    Model.remove({})
  ]));

  it('constructor should export a function', () => {
    expect(encodeKeysPlugin).toBeA('function');
  });
  it('should properly save one document', () => {
    const orig = {name: 'foo'};
    return Model.create(orig)
      .then((doc) => {
        expect(doc.publicKey).toBeA('string');
        expect(doc.publicKey).toMatch(/^-----BEGIN PUBLIC KEY-----/);
        expect(doc.publicKey).toMatch(/-----END PUBLIC KEY-----\r\n$/);
        expect(doc.privateKey).toBeA('string');
        expect(doc.privateKey).toMatch(/^-----BEGIN RSA PRIVATE KEY-----/);
        expect(doc.privateKey).toMatch(/-----END RSA PRIVATE KEY-----\r\n$/);
        return Model.findOne({_id: doc.id});
      })
      .then((doc) => {
        expect(doc.publicKey).toBeA('string');
        expect(doc.publicKey).toMatch(/^-----BEGIN PUBLIC KEY-----/);
        expect(doc.publicKey).toMatch(/-----END PUBLIC KEY-----\r\n$/);
        expect(doc.privateKey).toBe(undefined);
        return Model.findOne({_id: doc.id}, '', {select: '+privateKey'});
      })
      .then((doc) => {
        expect(doc.publicKey).toBeA('string');
        expect(doc.publicKey).toMatch(/^-----BEGIN PUBLIC KEY-----/);
        expect(doc.publicKey).toMatch(/-----END PUBLIC KEY-----\r\n$/);
        expect(doc.privateKey).toBeA('string');
        expect(doc.privateKey).toMatch(/^-----BEGIN RSA PRIVATE KEY-----/);
        expect(doc.privateKey).toMatch(/-----END RSA PRIVATE KEY-----\r\n$/);
      });
  });
  it('should properly support find without results', () => (
    Model.findOne({name: 'bar'})
  ));
  it('should properly support update without results', () => (
    Model.update({name: 'bar'}, {})
  ));
});
