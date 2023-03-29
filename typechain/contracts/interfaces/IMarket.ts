/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IMarketInterface extends utils.Interface {
  functions: {
    "addCollateral(address,address,bool,uint256)": FunctionFragment;
    "asset()": FunctionFragment;
    "assetId()": FunctionFragment;
    "borrow(address,address,uint256)": FunctionFragment;
    "collateral()": FunctionFragment;
    "collateralId()": FunctionFragment;
    "exchangeRate()": FunctionFragment;
    "execute(bytes[],bool)": FunctionFragment;
    "liquidationMultiplier()": FunctionFragment;
    "oracle()": FunctionFragment;
    "oracleData()": FunctionFragment;
    "removeCollateral(address,address,uint256)": FunctionFragment;
    "repay(address,address,bool,uint256)": FunctionFragment;
    "totalBorrow()": FunctionFragment;
    "totalBorrowCap()": FunctionFragment;
    "totalCollateralShare()": FunctionFragment;
    "userBorrowPart(address)": FunctionFragment;
    "userCollateralShare(address)": FunctionFragment;
    "withdrawTo(address,uint16,bytes32,uint256,bytes,address)": FunctionFragment;
    "yieldBox()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addCollateral"
      | "asset"
      | "assetId"
      | "borrow"
      | "collateral"
      | "collateralId"
      | "exchangeRate"
      | "execute"
      | "liquidationMultiplier"
      | "oracle"
      | "oracleData"
      | "removeCollateral"
      | "repay"
      | "totalBorrow"
      | "totalBorrowCap"
      | "totalCollateralShare"
      | "userBorrowPart"
      | "userCollateralShare"
      | "withdrawTo"
      | "yieldBox"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addCollateral",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "asset", values?: undefined): string;
  encodeFunctionData(functionFragment: "assetId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "borrow",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "collateral",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "collateralId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [PromiseOrValue<BytesLike>[], PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "liquidationMultiplier",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "oracle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "oracleData",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeCollateral",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "repay",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "totalBorrow",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalBorrowCap",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalCollateralShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userBorrowPart",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "userCollateralShare",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTo",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "yieldBox", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "addCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "asset", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "assetId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "borrow", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "collateral", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collateralId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "liquidationMultiplier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "oracle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "oracleData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "repay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalBorrow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalBorrowCap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalCollateralShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userBorrowPart",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userCollateralShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdrawTo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "yieldBox", data: BytesLike): Result;

  events: {};
}

export interface IMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IMarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addCollateral(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      skim: PromiseOrValue<boolean>,
      share: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asset(overrides?: CallOverrides): Promise<[string]>;

    assetId(overrides?: CallOverrides): Promise<[BigNumber]>;

    borrow(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    collateral(overrides?: CallOverrides): Promise<[string]>;

    collateralId(overrides?: CallOverrides): Promise<[BigNumber]>;

    exchangeRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    execute(
      calls: PromiseOrValue<BytesLike>[],
      revertOnFail: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    liquidationMultiplier(overrides?: CallOverrides): Promise<[BigNumber]>;

    oracle(overrides?: CallOverrides): Promise<[string]>;

    oracleData(overrides?: CallOverrides): Promise<[string]>;

    removeCollateral(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      share: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    repay(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      skim: PromiseOrValue<boolean>,
      part: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalBorrow(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }
    >;

    totalBorrowCap(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalCollateralShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    userBorrowPart(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    userCollateralShare(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdrawTo(
      from: PromiseOrValue<string>,
      dstChainId: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      adapterParams: PromiseOrValue<BytesLike>,
      refundAddress: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    yieldBox(overrides?: CallOverrides): Promise<[string]>;
  };

  addCollateral(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    skim: PromiseOrValue<boolean>,
    share: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asset(overrides?: CallOverrides): Promise<string>;

  assetId(overrides?: CallOverrides): Promise<BigNumber>;

  borrow(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  collateral(overrides?: CallOverrides): Promise<string>;

  collateralId(overrides?: CallOverrides): Promise<BigNumber>;

  exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

  execute(
    calls: PromiseOrValue<BytesLike>[],
    revertOnFail: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  liquidationMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

  oracle(overrides?: CallOverrides): Promise<string>;

  oracleData(overrides?: CallOverrides): Promise<string>;

  removeCollateral(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    share: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  repay(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    skim: PromiseOrValue<boolean>,
    part: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalBorrow(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }>;

  totalBorrowCap(overrides?: CallOverrides): Promise<BigNumber>;

  totalCollateralShare(overrides?: CallOverrides): Promise<BigNumber>;

  userBorrowPart(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  userCollateralShare(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdrawTo(
    from: PromiseOrValue<string>,
    dstChainId: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    adapterParams: PromiseOrValue<BytesLike>,
    refundAddress: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  yieldBox(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addCollateral(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      skim: PromiseOrValue<boolean>,
      share: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    asset(overrides?: CallOverrides): Promise<string>;

    assetId(overrides?: CallOverrides): Promise<BigNumber>;

    borrow(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { part: BigNumber; share: BigNumber }>;

    collateral(overrides?: CallOverrides): Promise<string>;

    collateralId(overrides?: CallOverrides): Promise<BigNumber>;

    exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

    execute(
      calls: PromiseOrValue<BytesLike>[],
      revertOnFail: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<
      [boolean[], string[]] & { successes: boolean[]; results: string[] }
    >;

    liquidationMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<string>;

    oracleData(overrides?: CallOverrides): Promise<string>;

    removeCollateral(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      share: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    repay(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      skim: PromiseOrValue<boolean>,
      part: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalBorrow(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { elastic: BigNumber; base: BigNumber }
    >;

    totalBorrowCap(overrides?: CallOverrides): Promise<BigNumber>;

    totalCollateralShare(overrides?: CallOverrides): Promise<BigNumber>;

    userBorrowPart(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userCollateralShare(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawTo(
      from: PromiseOrValue<string>,
      dstChainId: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      adapterParams: PromiseOrValue<BytesLike>,
      refundAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    yieldBox(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    addCollateral(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      skim: PromiseOrValue<boolean>,
      share: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asset(overrides?: CallOverrides): Promise<BigNumber>;

    assetId(overrides?: CallOverrides): Promise<BigNumber>;

    borrow(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    collateral(overrides?: CallOverrides): Promise<BigNumber>;

    collateralId(overrides?: CallOverrides): Promise<BigNumber>;

    exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

    execute(
      calls: PromiseOrValue<BytesLike>[],
      revertOnFail: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    liquidationMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<BigNumber>;

    oracleData(overrides?: CallOverrides): Promise<BigNumber>;

    removeCollateral(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      share: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    repay(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      skim: PromiseOrValue<boolean>,
      part: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalBorrow(overrides?: CallOverrides): Promise<BigNumber>;

    totalBorrowCap(overrides?: CallOverrides): Promise<BigNumber>;

    totalCollateralShare(overrides?: CallOverrides): Promise<BigNumber>;

    userBorrowPart(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userCollateralShare(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawTo(
      from: PromiseOrValue<string>,
      dstChainId: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      adapterParams: PromiseOrValue<BytesLike>,
      refundAddress: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    yieldBox(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addCollateral(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      skim: PromiseOrValue<boolean>,
      share: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asset(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    assetId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    borrow(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    collateral(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    collateralId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    exchangeRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    execute(
      calls: PromiseOrValue<BytesLike>[],
      revertOnFail: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    liquidationMultiplier(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    oracleData(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeCollateral(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      share: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    repay(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      skim: PromiseOrValue<boolean>,
      part: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalBorrow(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalBorrowCap(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalCollateralShare(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userBorrowPart(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userCollateralShare(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawTo(
      from: PromiseOrValue<string>,
      dstChainId: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      adapterParams: PromiseOrValue<BytesLike>,
      refundAddress: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    yieldBox(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}