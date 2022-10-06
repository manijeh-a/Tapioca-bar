import * as dotenv from 'dotenv';

import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';
import { HardhatUserConfig } from 'hardhat/config';
import 'hardhat-deploy';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';

dotenv.config();

const config: HardhatUserConfig & { dodoc?: any } = {
    solidity: {
        compilers: [
            {
                version: '0.6.12',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: '0.8.9',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999,
                    },
                },
            },
        ],
    },
    namedAccounts: {
        deployer: 0,
    },
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {
            hardfork: 'merge',
            allowUnlimitedContractSize: true,
            accounts: {
                count: 5,
            },
            tags: ['testnet'],
        },
        rinkeby: {
            gasMultiplier: 2,
            url:
                process.env.RINKEBY ??
                'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            chainId: 4,
            accounts:
                process.env.PRIVATE_KEY !== undefined
                    ? [process.env.PRIVATE_KEY]
                    : [],
            tags: ['testnet'],
            live: true,
        },
    },
    etherscan: {
        apiKey: {
            rinkeby: process.env.RINKEBY_KEY ?? '',
        },
        customChains: [],
    },
    typechain: {
        outDir: 'typechain',
        target: 'ethers-v5',
    },
    gasReporter: {
        enabled: false,
    },
    mocha: {
        timeout: 4000000,
    },
    dodoc: {
        runOnCompile: true,
        freshOutput: true,
    },
};

export default config;
