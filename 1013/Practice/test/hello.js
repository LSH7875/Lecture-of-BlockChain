const hello = artifacts.require("hello");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("hello", function (/* accounts */) {
  it("실행됨니다", async function () {
    let instance = await hello.deployed();
    let result = await instance.goodmorning();
    console.log(result)
    return assert.isTrue(true);
  });
});
