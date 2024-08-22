/* IMPORT NODE MODULES
================================================== */
import { type RunTaskFunction } from "hardhat/types";

/* UTILS
================================================== */
export function createVerifyWrapper(run: RunTaskFunction) {
    return async function (
        name: string,
        address: string,
        constructorArguments: unknown[],
        contract?: string
    ) {
        try {
            console.log(`Verifying: ${name}\n`);

            await run("verify:verify", {
                address,
                constructorArguments,
                contract,
            });

            console.log("Verification Completed");
            console.log("Status: Success\n");
            console.log("========================================\n");
        } catch (e) {
            console.log("Verification Failed\n");
            console.log("========================================\n");
            console.log(e);
        }
    };
}
