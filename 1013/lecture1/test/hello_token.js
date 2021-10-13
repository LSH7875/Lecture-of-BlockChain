const HelloToken = artifacts.require("HelloToken");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("HelloToken", function (/* accounts */) {
  //console.log('should assert true');
  //function async aa(){};
  //aa();
  it("should assert true", async function () {
    let instance = await HelloToken.deployed();
    let result = instance.helo();
    console.log(`consolelog:`,result);
    // return assert.isTrue(true);
    return result;
  });
});

contract("HelloToken2", function (/* accounts */) {
  //console.log('should assert true');
  //function async aa(){};
  //aa();
  it("hello token2", async function () {
    let instance = await HelloToken.deployed();
    let result = instance.hello();
    console.log(`consolelog:`,result);
    // return assert.isTrue(true);
    return result;
  });
});
