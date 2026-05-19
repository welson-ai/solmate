const hre = require("hardhat");

async function main() {
  const address = "0xEA65d20f0D3B6b77e467CF1FeCE21F7bc3166470";
  const balance = await hre.ethers.provider.getBalance(address);
  console.log("Address:", address);
  console.log("Balance:", hre.ethers.formatEther(balance), "CELO");
}

main();
