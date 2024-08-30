/* IMPORT NODE MODULES
================================================== */
import { ethers } from "hardhat";

/* IMPORT CONSTANTS AND UTILS
================================================== */
import { checkENV } from "@utils/checkENV";
import { d } from "@utils/deploy";
import { env, err } from "@utils/misc";
import data from "../../deployment_data/devnet/deployed_contracts.json";
import { writeJSON } from "@utils/json";

/* CONSTANTS AND UTILS
================================================== */
const REQUIRED_VARS = [
    "DEVNET_CHAIN_ID",
    "HAVEN_DEVNET_RPC",
    "DEVNET_EXPLORER",
    "DEVNET_DEPLOYER",
];

/* SCRIPT
================================================== */
async function main() {
    /* Environment Check
    ======================================== */
    const missingVars = checkENV(REQUIRED_VARS);
    if (missingVars.length > 0) {
        err(`ErrMissingVars: ${missingVars.join("\n")}`);
    }

    const expectedChainID = env("DEVNET_CHAIN_ID");
    const network = await ethers.provider.getNetwork();
    const chainID = network.chainId.toString();

    if (expectedChainID != chainID) {
        err(`Expected chain ID: ${expectedChainID}. Got chain ID: ${chainID}`);
    }

    /* Setup
    ======================================== */
    const [deployer] = await ethers.getSigners();
    const deployerAddr = await deployer.getAddress();

    // Redstone contracts default to eight decimal places of precision.
    const answer = ethers.parseUnits("1.2", 8);

    /* Deploy
    ======================================== */
    const mockH1Feed = await d("Mock H1 Feed", async function () {
        const f = await ethers.getContractFactory("MockH1PriceFeed", deployer);

        const c = await f.deploy(deployerAddr, answer);
        await c.waitForDeployment();
        await c.deploymentTransaction()?.wait(1);

        return c;
    });

    /* Write Output
    ======================================== */
    const out = {
        ...data,
        mocks: {
            mockH1Feed: {
                address: mockH1Feed.address,
                args: [deployerAddr, answer.toString()],
            },
        },
    };

    writeJSON("deployment_data/devnet/deployed_contracts.json", out);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
