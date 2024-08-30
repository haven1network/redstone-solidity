/* IMPORT NODE MODULES
================================================== */
import { task } from "hardhat/config";

/* IMPORT CONSTANTS AND UTILS
================================================== */
import data from "../../deployment_data/devnet/deployed_contracts.json";
import { createVerifyWrapper } from "@utils/deploy/verifyWrapper";

/* Task
================================================== */
/**
 * Task responsible for verifying the devnet contracts.
 *
 * @example
 * npx hardhat verifyDevnet --network haven_devnet
 * npm run verify:devnet
 */
task("verifyDevnet", "Verifies the devnet contracts").setAction(async function (
    _,
    { run }
) {
    console.log(
        "\n==========================================================================================\n"
    );
    console.log("Verifying Devnet Contracts");
    console.log(
        "\n==========================================================================================\n"
    );

    const v = createVerifyWrapper(run);

    await v(
        "Multi Feed Adapter",
        data.multiFeedAdapter,
        [],
        "contracts/devnet/Haven1DevnetMultiFeedAdapterWithoutRoundsV1.sol:Haven1DevnetMultiFeedAdapterWithoutRoundsV1"
    );

    for (const [k, val] of Object.entries(data.priceFeeds)) {
        await v(`Price Feed - ${k}`, val, []);
    }

    for (const [k, val] of Object.entries(data.mocks)) {
        await v(`Price Feed - ${k}`, val.address, val.args);
    }
});
