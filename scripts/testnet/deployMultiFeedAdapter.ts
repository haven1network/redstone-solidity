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
    "TESTNET_CHAIN_ID",
    "HAVEN_TESTNET_RPC",
    "TESTNET_EXPLORER",
    "TESTNET_DEPLOYER",
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

    const expectedChainID = env("TESTNET_CHAIN_ID");
    const network = await ethers.provider.getNetwork();
    const chainID = network.chainId.toString();

    if (expectedChainID != chainID) {
        err(`Expected chain ID: ${expectedChainID}. Got chain ID: ${chainID}`);
    }

    /* Setup
    ======================================== */
    const [deployer] = await ethers.getSigners();

    /* Deploy
    ======================================== */
    const adapter = await d("Multi Feed Adapter", async function () {
        const f = await ethers.getContractFactory(
            "Haven1TestnetMultiFeedAdapterWithoutRoundsV1",
            deployer
        );

        const c = await f.deploy();
        await c.waitForDeployment();
        await c.deploymentTransaction()?.wait(1);

        return c;
    });

    /* Write Output
    ======================================== */
    const out = {
        ...data,
        multiFeedAdapter: adapter.address,
    };

    writeJSON("deployment_data/testnet/deployed_contracts.json", out);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
