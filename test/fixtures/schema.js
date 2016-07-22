import {Schema} from 'mongoose';
import rsaPlugin from './../../src';

const schema = new Schema({
  name: {type: String, required: true}
});

// Add RSA keypair generation
schema.plugin(rsaPlugin, {});

export default schema;
