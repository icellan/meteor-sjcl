// overwrite sjcl random function, is not compatible with meteor
// The standard meteor Random() is also a strong random generator
sjcl.random.randomWords = function(length) {
    var rand = [];
    for(var i = 0; i < length; i++) {
        rand.push(sjcl.codec.hex.toBits(Random.hexString(8))[0]);
    }
    return rand;
}