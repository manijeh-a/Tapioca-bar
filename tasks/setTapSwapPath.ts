import { HardhatRuntimeEnvironment } from 'hardhat/types';
import _ from 'lodash';
import { getDeployment, getMixologistContract } from './utils';

//Execution example:
//      npx hardhat setTapSwapPath --mixologist "<address>" --path "[<address1>,<address2>]"
export const setPath = async (
    taskArgs: any,
    hre: HardhatRuntimeEnvironment,
) => {
    const beachBarContract = await getDeployment(hre, 'BeachBar');
    const { mixologistContract, mixologistAddress } =
        await getMixologistContract(taskArgs, hre);

    const callData = mixologistContract.interface.encodeFunctionData(
        'setTapSwapPath',
        [taskArgs['path']],
    );

    await beachBarContract.executeMixologistFn(
        [mixologistAddress],
        [callData],
        true,
    );
};

export const setTapSwapPath__task = async (
    args: any,
    hre: HardhatRuntimeEnvironment,
) => {
    console.log(
        `Setting tapSwapPath ('${args['path']}') on mixologist: ${args['mixologist']}`,
    );
    await setPath(args, hre);
    console.log('Execution completed');
};