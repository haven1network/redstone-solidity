/* IMPORT NODE MODULES
================================================== */
import { task } from "hardhat/config";

/* IMPORT CONSTANTS AND UTILS
================================================== */
import data from "../../deployment_data/testnet/deployed_contracts.json";
import { createVerifyWrapper } from "@utils/deploy/verifyWrapper";

/* Task
================================================== */
/**
 * Task responsible for verifying the testnet contracts.
 *
 * @example
 * npx hardhat verifyTestnet --network haven_testnet
 * npm run verify:testnet
 */
task("verifyTestnet", "Verifies the testnet contracts").setAction(
    async function (_, { run }) {
        console.log(
            "\n==========================================================================================\n"
        );
        console.log("Verifying Testnet Contracts");
        console.log(
            "\n==========================================================================================\n"
        );

        const v = createVerifyWrapper(run);

        await v(
            "Multi Feed Adapter",
            data.multiFeedAdapter,
            [],

            "contracts/testnet/Haven1TestnetMultiFeedAdapterWithoutRoundsV1.sol:Haven1TestnetMultiFeedAdapterWithoutRoundsV1"
        );

        for (const [k, val] of Object.entries(data.priceFeeds)) {
            await v(`Price Feed - ${k}`, val, []);
        }
    }
);
