const { expect } = require('chai');

// let Box;
// let box;

// Start test block
describe('BoxV3 proxy error', function () {
//   beforeEach(async function () {
//     Box = await ethers.getContractFactory("Box");
//     box = await upgrades.deployProxy(Box, [42], {initializer: 'store'});
//   });

  // Test case
  it('replicate error with value upgrade', async function () {
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    const Box = await ethers.getContractFactory("Box");
    let boxProxy = await upgrades.deployProxy(Box, [42], {initializer: 'store'});
    console.log("Initial proxy deployed to:", boxProxy.address);
    let boxValue = (await boxProxy.retrieve()).toString()
    console.log('initial box value: ', boxValue)
    expect(boxValue).to.equal('42');

    const BoxV3 = await ethers.getContractFactory("BoxV3");
    boxProxy = await upgrades.upgradeProxy(boxProxy.address, BoxV3)
    console.log("Upgrade proxy deployed to:", boxProxy.address);
    boxValue = (await boxProxy.retrieve()).toString()
    console.log('after upgrade box value: ', boxValue)
    expect(boxValue).to.equal('42');

    await boxProxy.setValue2()
    let boxValue2 = (await boxProxy.retrieveValue2()).toString()
    console.log('after upgrade and setValue2 box value: ', boxValue2)
    expect(boxValue2).to.equal('3');
  });
});
