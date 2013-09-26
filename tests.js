Tinytest.add('meteor-sjcl', function (test) {
  var isDefined = false;
  try {
    sjcl;
    isDefined = true;
  }
  catch (e) {
  }
  test.isTrue(isDefined, "sjcl is not defined");
  test.isTrue(Package.sjcl.sjcl, "Package.sjcl.sjcl is not defined");

  var bitArray = sjcl.hash.sha256.hash("message");
  var digestSHA256 = sjcl.codec.hex.fromBits(bitArray);
  test.equal(digestSHA256, 'ab530a13e45914982b79f9b7e3fba994cfd1f3fb22f71cea1afbf02b460c6d1d', "SHA-256 hash does not match");
});
