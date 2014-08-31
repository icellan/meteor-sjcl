Package.describe({
  summary: "Meteor smart package for the Stanford Javascript Crypto Library",
  name: "icellan:sjcl",
  version: "1.2.0",
  git: "https://github.com/icellan/meteor-sjcl.git"
});

function configurePackage(api) {
    api.export('sjcl');

    api.add_files([
        'sjcl/core/sjcl.js',
        'sjcl/core/aes.js',
        'sjcl/core/bitArray.js',
        'sjcl/core/codecString.js',
        'sjcl/core/codecHex.js',
        'sjcl/core/codecBase64.js',
        'sjcl/core/codecArrayBuffer.js',
        'sjcl/core/sha256.js',
        'sjcl/core/bn.js',
        'sjcl/core/ecc.js',
        'sjcl/core/ccm.js',
        'sjcl/core/ocb2.js',
        'sjcl/core/gcm.js',
        'sjcl/core/hmac.js',
        'sjcl/core/pbkdf2.js',
        'sjcl/core/random.js',
        'sjcl/core/convenience.js',
        'meteor_overrides.js'
    ], ['client', 'server']);
}

Package.on_use(function (api) {
    configurePackage(api);
});

Package.on_test(function (api) {
    configurePackage(api);
    api.use(['tinytest', 'test-helpers'], ['client', 'server']);
    api.add_files('tests.js', ['client', 'server']);
});
