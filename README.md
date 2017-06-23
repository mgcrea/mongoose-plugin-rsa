# mongoose-plugin-rsa

[![npm version](https://img.shields.io/npm/v/mongoose-plugin-rsa.svg)](https://www.npmjs.com/package/mongoose-plugin-rsa)
[![license](https://img.shields.io/github/license/mgcrea/mongoose-plugin-rsa.svg?style=flat)](https://tldrlegal.com/license/mit-license)
[![build status](http://img.shields.io/travis/mgcrea/mongoose-plugin-rsa/master.svg?style=flat)](http://travis-ci.org/mgcrea/mongoose-plugin-rsa)
[![dependencies status](https://img.shields.io/david/mgcrea/mongoose-plugin-rsa.svg?style=flat)](https://david-dm.org/mgcrea/mongoose-plugin-rsa)
[![devDependencies status](https://img.shields.io/david/dev/mgcrea/mongoose-plugin-rsa.svg?style=flat)](https://david-dm.org/mgcrea/mongoose-plugin-rsa#info=devDependencies)
[![Codacy Badge_Grade](https://api.codacy.com/project/badge/Grade/99844d4bed38450f9ec9e03650d19954)](https://www.codacy.com/app/olivier_5/mongoose-plugin-rsa?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mgcrea/mongoose-plugin-rsa&amp;utm_campaign=Badge_Grade) [![Codacy Badge_Coverage](https://api.codacy.com/project/badge/Coverage/99844d4bed38450f9ec9e03650d19954)](https://www.codacy.com/app/olivier_5/mongoose-plugin-rsa?utm_source=github.com&utm_medium=referral&utm_content=mgcrea/mongoose-plugin-rsa&utm_campaign=Badge_Coverage)
[![npm downloads](https://img.shields.io/npm/dm/mongoose-plugin-rsa.svg)](https://www.npmjs.com/package/mongoose-plugin-rsa)

Automatic RSA keyPair generation on document creation.

## Quickstart

- Load the plugin inside your schema

```js
import {Schema} from 'mongoose';
import rsaPlugin from 'mongoose-plugin-rsa';

const schema = new Schema({
  name: {type: String, required: true},
  content: {type: Object, default: {}}
});

// Add RSA keypair generation
schema.plugin(rsaPlugin, {bits: 2048});

export default schema;
```

## Testing

- You can quickly start hacking around

```bash
git clone -o github git@github.com:mgcrea/mongoose-plugin-rsa.git
cd mongoose-plugin-rsa
npm i
npm test
```
