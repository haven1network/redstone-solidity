import "hardhat/types/config";
import { type HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "hardhat-contract-sizer";
import "@openzeppelin/hardhat-upgrades";
import "solidity-docgen";

import "tsconfig-paths/register";

import * as dotenv from "dotenv";

dotenv.config();

// testnet env
const HAVEN_TESTNET_RPC = process.env.HAVEN_TESTNET_RPC || "";
const TESTNET_CHAIN_ID = +process.env.TESTNET_CHAIN_ID!;
const TESTNET_DEPLOYER = process.env.TESTNET_DEPLOYER || "";
const TESTNET_EXPLORER = process.env.TESTNET_EXPLORER || "";
const TESTNET_EXPLORER_API = process.env.TESTNET_EXPLORER_API || "";
const TESTNET_EXPLORER_API_KEY = process.env.TESTNET_EXPLORER_API_KEY || "";

// devnet env
const DEVNET_CHAIN_ID = +process.env.DEVNET_CHAIN_ID!;
const HAVEN_DEVNET_RPC = process.env.HAVEN_DEVNET_RPC || "";
const DEVNET_DEPLOYER = process.env.DEVNET_DEPLOYER || "";
const DEVNET_EXPLORER = process.env.DEVNET_EXPLORER || "";
const DEVNET_EXPLORER_API = process.env.DEVNET_EXPLORER_API || "";
const DEVNET_EXPLORER_API_KEY = process.env.DEVNET_EXPLORER_API_KEY || "";

// type ext
declare module "hardhat/types/config" {
    interface NetworksUserConfig {
        haven_testnet?: NetworkUserConfig;
        haven_devnet?: NetworkUserConfig;
    }
}

// See, in general, https://hardhat.org/hardhat-runner/docs/config#configuration
const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            forking: {
                // enabled: !!HAVEN_TESTNET_RPC,
                enabled: false,
                url: HAVEN_TESTNET_RPC,
            },
        },
        remoteHardhat: {
            url: "http://hardhat:8545",
            forking: {
                enabled: !!HAVEN_TESTNET_RPC,
                url: HAVEN_TESTNET_RPC,
            },
        },
    },
    solidity: {
        compilers: [{ version: "0.8.24" }],
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
    },
    mocha: {
        timeout: 40_000,
    },
    contractSizer: {
        // see: https://github.com/ItsNickBarry/hardhat-contract-sizer
        alphaSort: false,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
    },
    docgen: {
        // see: https://github.com/OpenZeppelin/solidity-docgen#readme
        outputDir: "./docs",
        pages: "files",
        exclude: ["test"],
    },
    etherscan: {
        apiKey: {
            haven_testnet: TESTNET_EXPLORER_API_KEY,
            haven_devnet: DEVNET_EXPLORER_API_KEY,
        },
        customChains: [
            {
                network: "haven_testnet",
                chainId: TESTNET_CHAIN_ID,
                urls: {
                    apiURL: TESTNET_EXPLORER_API,
                    browserURL: TESTNET_EXPLORER,
                },
            },
            {
                network: "haven_devnet",
                chainId: DEVNET_CHAIN_ID,
                urls: {
                    apiURL: DEVNET_EXPLORER_API,
                    browserURL: DEVNET_EXPLORER,
                },
            },
        ],
    },
};

if (HAVEN_TESTNET_RPC && TESTNET_DEPLOYER && config.networks) {
    config.networks = {
        ...config.networks,
        haven_testnet: {
            url: HAVEN_TESTNET_RPC,
            accounts: [TESTNET_DEPLOYER],
        },
    };
}

if (HAVEN_DEVNET_RPC && DEVNET_DEPLOYER && config.networks) {
    config.networks = {
        ...config.networks,
        haven_devnet: {
            url: HAVEN_DEVNET_RPC,
            accounts: [DEVNET_DEPLOYER],
        },
    };
}

export default config;
