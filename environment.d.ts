declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Testnet
            TESTNET_CHAIN_ID?: string;
            HAVEN_TESTNET_RPC?: string;

            TESTNET_EXPLORER?: string;
            TESTNET_EXPLORER_API?: string;
            TESTNET_EXPLORER_API_KEY?: string;

            TESTNET_DEPLOYER?: string;

            // Devnet
            DEVNET_CHAIN_ID?: string;
            HAVEN_DEVNET_RPC?: string;

            DEVNET_EXPLORER?: string;
            DEVNET_EXPLORER_API?: string;
            DEVNET_EXPLORER_API_KEY?: string;

            DEVNET_DEPLOYER?: string;
        }
    }
}

export {};
