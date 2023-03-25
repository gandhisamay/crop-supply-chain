const CropSupplyChain = artifacts.require("Crop_Supply_Chain.sol");
const EntityPortal = artifacts.require("Entity_Portal.sol");
const SeedCertificationPortal = artifacts.require("Seed_Certification_Portal.sol");

module.exports = async function(deployer) {
  let result = await deployer.deploy(CropSupplyChain);
  console.log(result);
  deployer.deploy(EntityPortal);
  deployer.deploy(SeedCertificationPortal);
};


