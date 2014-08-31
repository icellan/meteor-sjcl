Tinytest.add('meteor-sjcl', function (test) {
  var isDefined = false;
  try {
    sjcl;
    isDefined = true;
  }
  catch (e) {
  }
  test.isTrue(isDefined, "sjcl is not defined");

  var bitArray = sjcl.hash.sha256.hash("message");
  var digestSHA256 = sjcl.codec.hex.fromBits(bitArray);
  test.equal(digestSHA256, 'ab530a13e45914982b79f9b7e3fba994cfd1f3fb22f71cea1afbf02b460c6d1d', "SHA-256 hash does not match");

  var pbkdf2 = sjcl.misc.pbkdf2('some string', 'some salt', 1000 );
  var digestPbkdf2 = sjcl.codec.hex.fromBits(pbkdf2);
  test.equal(digestPbkdf2, 'dcab42c8c1192c61af3eec2b76ed76a99ad44f08b8d4ab907392272b4543b638', 'PBKDF2 hash does not match');

  var secretKey = sjcl.codec.hex.toBits('dcab42c8c1192c61af3eec2b76ed76a99ad44f08b8d4ab907392272b4543b638');
  var eccKeys = sjcl.ecc.elGamal.generateKeys(256, null, sjcl.bn.fromBits(secretKey));
  var pub = eccKeys.pub.get();
  var publicKey = sjcl.codec.hex.fromBits(pub.x) + sjcl.codec.hex.fromBits(pub.y);
  test.equal(publicKey, 'b6cb802110e76eef46ef8dcd70d9e8d12308736e7d21a30bf54cd6a7a88a62bebdd3b252a13f43256ac33264c088075e193b967d6173ddbfdf9e74afcedaaa51', 'Public key does not match');

  var secretKey = sjcl.codec.hex.toBits('dcab42c8c1192c61af3eec2b76ed76a99ad44f08b8d4ab907392272b4543b638');
  var eccKeys = sjcl.ecc.ecdsa.generateKeys(256, null, sjcl.bn.fromBits(secretKey));
  var pub = eccKeys.pub.get();
  var publicKey = sjcl.codec.hex.fromBits(pub.x) + sjcl.codec.hex.fromBits(pub.y);
  test.equal(publicKey, 'b6cb802110e76eef46ef8dcd70d9e8d12308736e7d21a30bf54cd6a7a88a62bebdd3b252a13f43256ac33264c088075e193b967d6173ddbfdf9e74afcedaaa51', 'Public key does not match');

  var hash = sjcl.hash.sha256.hash('Test Message');
  var signature = eccKeys.sec.sign(hash);
  test.equal(eccKeys.pub.verify(hash, signature), true, 'Signature not verified');
});
