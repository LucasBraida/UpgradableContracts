async function main() {
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    console.log("Deploying Box...");
    const boxV2 = await upgrades.upgradeProxy("0xaFAe2D9A828E537a6f9A052D3246fE54308e8441", BoxV2)
    console.log("Upgrade proxy deployed to:", boxV2.address);
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
