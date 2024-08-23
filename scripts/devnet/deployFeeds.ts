/* IMPORT NODE MODULES
================================================== */
import { ethers, upgrades } from "hardhat";
import {
    Haven1DevnetPriceFeedEthWithoutRoundsV1,
    Haven1DevnetPriceFeedUsdcWithoutRoundsV1,
    Haven1DevnetPriceFeedUsdtWithoutRoundsV1,
    Haven1DevnetPriceFeedWbtcWithoutRoundsV1,
} from "@typechain/index";

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

    /* Deploy
    ======================================== */
    const eth = await d("Price Feed - ETH", async function () {
        const f = await ethers.getContractFactory(
            "Haven1DevnetPriceFeedEthWithoutRoundsV1",
            deployer
        );

        const c = (await upgrades.deployProxy(
            f
        )) as unknown as Haven1DevnetPriceFeedEthWithoutRoundsV1;

        await c.waitForDeployment();
        await c.deploymentTransaction()?.wait(1);
        return c;
    });

    const usdc = await d("Price Feed - USDC", async function () {
        const f = await ethers.getContractFactory(
            "Haven1DevnetPriceFeedUsdcWithoutRoundsV1",
            deployer
        );

        const c = (await upgrades.deployProxy(
            f
        )) as unknown as Haven1DevnetPriceFeedUsdcWithoutRoundsV1;

        await c.waitForDeployment();
        await c.deploymentTransaction()?.wait(1);
        return c;
    });

    const usdt = await d("Price Feed - USDT", async function () {
        const f = await ethers.getContractFactory(
            "Haven1DevnetPriceFeedUsdtWithoutRoundsV1",
            deployer
        );

        const c = (await upgrades.deployProxy(
            f
        )) as unknown as Haven1DevnetPriceFeedUsdtWithoutRoundsV1;

        await c.waitForDeployment();
        await c.deploymentTransaction()?.wait(1);
        return c;
    });

    const wbtc = await d("Price Feed - wBTC", async function () {
        const f = await ethers.getContractFactory(
            "Haven1DevnetPriceFeedWbtcWithoutRoundsV1",
            deployer
        );

        const c = (await upgrades.deployProxy(
            f
        )) as unknown as Haven1DevnetPriceFeedWbtcWithoutRoundsV1;

        await c.waitForDeployment();
        await c.deploymentTransaction()?.wait(1);
        return c;
    });

    /* Write Output
    ======================================== */
    const out = {
        ...data,
        priceFeeds: {
            eth: eth.address,
            usdc: usdc.address,
            usdt: usdt.address,
            wbtc: wbtc.address,
        },
    };

    writeJSON("deployment_data/devnet/deployed_contracts.json", out);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
