/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  WETH9Mock,
  WETH9MockInterface,
} from "../../../../../contracts/singularity/legacy/mocks/WETH9Mock";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintLimit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_val",
        type: "uint256",
      },
    ],
    name: "freeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mintLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "mintedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60c0604052600d60808190526c2bb930b83832b21022ba3432b960991b60a090815261002e91600091906100a1565b50604080518082019091526004808252630ae8aa8960e31b602090920191825261005a916001916100a1565b506002805460ff1916601217905534801561007457600080fd5b50604051610a85380380610a858339818101604052602081101561009757600080fd5b5051600455610134565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100e257805160ff191683800117855561010f565b8280016001018555821561010f579182015b8281111561010f5782518255916020019190600101906100f4565b5061011b92915061011f565b5090565b5b8082111561011b5760008155600101610120565b610942806101436000396000f3fe6080604052600436106100e15760003560e01c806370a082311161007f578063996517cf11610059578063996517cf1461032a578063a9059cbb1461033f578063d0e30db014610378578063dd62ed3e14610380576100e8565b806370a08231146102b85780637c928fe9146102eb57806395d89b4114610315576100e8565b806321442ec9116100bb57806321442ec9146101eb57806323b872dd1461021e5780632e1a7d4d14610261578063313ce5671461028d576100e8565b806306fdde03146100ed578063095ea7b31461017757806318160ddd146101c4576100e8565b366100e857005b600080fd5b3480156100f957600080fd5b506101026103bb565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561013c578181015183820152602001610124565b50505050905090810190601f1680156101695780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561018357600080fd5b506101b06004803603604081101561019a57600080fd5b506001600160a01b038135169060200135610449565b604080519115158252519081900360200190f35b3480156101d057600080fd5b506101d96104af565b60408051918252519081900360200190f35b3480156101f757600080fd5b506101d96004803603602081101561020e57600080fd5b50356001600160a01b03166104b3565b34801561022a57600080fd5b506101b06004803603606081101561024157600080fd5b506001600160a01b038135811691602081013590911690604001356104c5565b34801561026d57600080fd5b5061028b6004803603602081101561028457600080fd5b5035610667565b005b34801561029957600080fd5b506102a2610733565b6040805160ff9092168252519081900360200190f35b3480156102c457600080fd5b506101d9600480360360208110156102db57600080fd5b50356001600160a01b031661073c565b3480156102f757600080fd5b5061028b6004803603602081101561030e57600080fd5b503561074e565b34801561032157600080fd5b5061010261082c565b34801561033657600080fd5b506101d9610886565b34801561034b57600080fd5b506101b06004803603604081101561036257600080fd5b506001600160a01b03813516906020013561088c565b61028b6108a0565b34801561038c57600080fd5b506101d9600480360360408110156103a357600080fd5b506001600160a01b03813581169160200135166108ef565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104415780601f1061041657610100808354040283529160200191610441565b820191906000526020600020905b81548152906001019060200180831161042457829003601f168201915b505050505081565b3360008181526006602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b4790565b60036020526000908152604090205481565b6001600160a01b038316600090815260056020526040812054821115610521576040805162461bcd60e51b815260206004820152600c60248201526b2ba2aa241c9d1022b93937b960a11b604482015290519081900360640190fd5b6001600160a01b038416331480159061055f57506001600160a01b038416600090815260066020908152604080832033845290915290205460001914155b156105f6576001600160a01b03841660009081526006602090815260408083203384529091529020548211156105cb576040805162461bcd60e51b815260206004820152600c60248201526b2ba2aa241c9d1022b93937b960a11b604482015290519081900360640190fd5b6001600160a01b03841660009081526006602090815260408083203384529091529020805483900390555b6001600160a01b03808516600081815260056020908152604080832080548890039055938716808352918490208054870190558351868152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35060019392505050565b336000908152600560205260409020548111156106ba576040805162461bcd60e51b815260206004820152600c60248201526b2ba2aa241c9d1022b93937b960a11b604482015290519081900360640190fd5b33600081815260056020526040808220805485900390555183156108fc0291849190818181858888f193505050501580156106f9573d6000803e3d6000fd5b5060408051828152905133917f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65919081900360200190a250565b60025460ff1681565b60056020526000908152604090205481565b6004548111156107a5576040805162461bcd60e51b815260206004820152601960248201527f57455448394d6f636b3a20616d6f756e7420746f6f2062696700000000000000604482015290519081900360640190fd5b3360009081526003602052604090205442620151809091011115610807576040805162461bcd60e51b815260206004820152601460248201527357455448394d6f636b3a20746f6f206561726c7960601b604482015290519081900360640190fd5b3360009081526003602090815260408083204290556005909152902080549091019055565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104415780601f1061041657610100808354040283529160200191610441565b60045481565b60006108993384846104c5565b9392505050565b33600081815260056020908152604091829020805434908101909155825190815291517fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9281900390910190a2565b60066020908152600092835260408084209091529082529020548156fea26469706673582212208d531d44ab546756fa4413f6a622d4fea629ea5aa701a07df69cd33d189d236564736f6c634300060c0033";

type WETH9MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WETH9MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WETH9Mock__factory extends ContractFactory {
  constructor(...args: WETH9MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _mintLimit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WETH9Mock> {
    return super.deploy(_mintLimit, overrides || {}) as Promise<WETH9Mock>;
  }
  override getDeployTransaction(
    _mintLimit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_mintLimit, overrides || {});
  }
  override attach(address: string): WETH9Mock {
    return super.attach(address) as WETH9Mock;
  }
  override connect(signer: Signer): WETH9Mock__factory {
    return super.connect(signer) as WETH9Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WETH9MockInterface {
    return new utils.Interface(_abi) as WETH9MockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WETH9Mock {
    return new Contract(address, _abi, signerOrProvider) as WETH9Mock;
  }
}