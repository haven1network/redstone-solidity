/* IMPORT NODE MODULES
================================================== */
import { ethers, upgrades } from "hardhat";
import {
    Haven1PriceFeedEthWithoutRoundsV1,
    Haven1PriceFeedUsdcWithoutRoundsV1,
    Haven1PriceFeedUsdtWithoutRoundsV1,
    Haven1PriceFeedWbtcWithoutRoundsV1,
} from "@typechain/index";

/* IMPORT CONSTANTS AND UTILS
================================================== */
import { checkENV } from "@utils/checkENV";
import { d } from "@utils/deploy";

/* CONSTANTS AND UTILS
================================================== */
const REQUIRED_VARS = [
    "TESTNET_CHAIN_ID",
    "HAVEN_TESTNET_RPC",
    "TESTNET_EXPLORER",
    "TESTNET_DEPLOYER",
];

function env(name: string): string {
    return process.env[name] as string;
}

function err(msg: string): never {
    throw new Error(msg);
}

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
    await d("Price Feed - ETH", async function () {
        const f = await ethers.getContractFactory(
            "Haven1PriceFeedEthWithoutRoundsV1",
            deployer
        );

        const c = (await upgrades.deployProxy(
            f
        )) as unknown as Haven1PriceFeedEthWithoutRoundsV1;

        return await c.waitForDeployment();
    });

    await d("Price Feed - USDC", async function () {
        const f = await ethers.getContractFactory(
            "Haven1PriceFeedUsdcWithoutRoundsV1",
            deployer
        );

        const c = (await upgrades.deployProxy(
            f
        )) as unknown as Haven1PriceFeedUsdcWithoutRoundsV1;

        return await c.waitForDeployment();
    });

    await d("Price Feed - USDT", async function () {
        const f = await ethers.getContractFactory(
            "Haven1PriceFeedUsdtWithoutRoundsV1",
            deployer
        );

        const c = (await upgrades.deployProxy(
            f
        )) as unknown as Haven1PriceFeedUsdtWithoutRoundsV1;

        return await c.waitForDeployment();
    });

    await d("Price Feed - wBTC", async function () {
        const f = await ethers.getContractFactory(
            "Haven1PriceFeedWbtcWithoutRoundsV1",
            deployer
        );

        const c = (await upgrades.deployProxy(
            f
        )) as unknown as Haven1PriceFeedWbtcWithoutRoundsV1;

        return await c.waitForDeployment();
    });
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
