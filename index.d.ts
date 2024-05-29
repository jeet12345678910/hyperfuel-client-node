/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

export interface Config {
  /** Url of the source hypersync instance */
  url: string
  /** Optional bearer_token to put into http requests made to source hypersync instance */
  bearerToken?: string
  /** Timout treshold for a single http request in milliseconds, default is 30 seconds (30_000ms) */
  httpReqTimeoutMillis?: number
}
export interface ReceiptSelection {
  rootContractId?: Array<string>
  toAddress?: Array<string>
  assetId?: Array<string>
  receiptType?: Array<number>
  sender?: Array<string>
  recipient?: Array<string>
  contractId?: Array<string>
  ra?: Array<bigint>
  rb?: Array<bigint>
  rc?: Array<bigint>
  rd?: Array<bigint>
  txStatus?: Array<number>
}
export interface InputSelection {
  owner?: Array<string>
  assetId?: Array<string>
  contract?: Array<string>
  sender?: Array<string>
  recipient?: Array<string>
  inputType?: Array<number>
  txStatus?: Array<number>
}
export interface OutputSelection {
  to?: Array<string>
  assetId?: Array<string>
  contract?: Array<string>
  outputType?: Array<number>
  txStatus?: Array<number>
}
export interface FieldSelection {
  block?: Array<string>
  transaction?: Array<string>
  receipt?: Array<string>
  input?: Array<string>
  output?: Array<string>
}
export interface Query {
  /** The block to start the query from */
  fromBlock: number
  /**
   * The block to end the query at. If not specified, the query will go until the
   *  end of data. Exclusive, the returned range will be [from_block..to_block).
   *
   * The query will return before it reaches this target block if it hits the time limit
   *  configured on the server. The user should continue their query by putting the
   *  next_block field in the response into from_block field of their next query. This implements
   *  pagination.
   */
  toBlock?: number
  /**
   * List of receipt selections, the query will return receipts that match any of these selections and
   *  it will return receipts that are related to the returned objects.
   */
  receipts?: Array<ReceiptSelection>
  /**
   * List of input selections, the query will return inputs that match any of these selections and
   *  it will return inputs that are related to the returned objects.
   */
  inputs?: Array<InputSelection>
  /**
   * List of output selections, the query will return outputs that match any of these selections and
   *  it will return outputs that are related to the returned objects.
   */
  outputs?: Array<OutputSelection>
  /**
   * Whether to include all blocks regardless of if they are related to a returned transaction or log. Normally
   *  the server will return only the blocks that are related to the transaction or logs in the response. But if this
   *  is set to true, the server will return data for all blocks in the requested range [from_block, to_block).
   */
  includeAllBlocks?: boolean
  /**
   * Field selection. The user can select which fields they are interested in, requesting less fields will improve
   *  query execution time and reduce the payload size so the user should always use a minimal number of fields.
   */
  fieldSelection: FieldSelection
  /**
   * Maximum number of blocks that should be returned, the server might return more blocks than this number but
   *  it won't overshoot by too much.
   */
  maxNumBlocks?: number
  /**
   * Maximum number of transactions that should be returned, the server might return more transactions than this number but
   *  it won't overshoot by too much.
   */
  maxNumTransactions?: number
}
export interface QueryResponseTyped {
  /** Current height of the source hypersync instance */
  archiveHeight?: number
  /**
   * Next block to query for, the responses are paginated so
   * the caller should continue the query from this block if they
   * didn't get responses up to the to_block they specified in the Query.
   */
  nextBlock: number
  /** Total time it took the hypersync instance to execute the query. */
  totalExecutionTime: number
  /** Response data */
  data: QueryResponseDataTyped
}
export interface QueryResponseDataTyped {
  blocks: Array<Block>
  transactions: Array<Transaction>
  receipts: Array<Receipt>
  inputs: Array<Input>
  outputs: Array<Output>
}
export interface LogResponse {
  /** Current height of the source hypersync instance */
  archiveHeight?: number
  /**
   * Next block to query for, the responses are paginated so
   * the caller should continue the query from this block if they
   * didn't get responses up to the to_block they specified in the Query.
   */
  nextBlock: number
  /** Total time it took the hypersync instance to execute the query. */
  totalExecutionTime: number
  /** Response data */
  data: Array<LogContext>
}
/**
 * Contains all the fields needed for decoding plus some additional fields
 * for context.
 */
export interface LogContext {
  blockHeight: number
  txId: string
  receiptIndex: number
  receiptType: number
  contractId?: string
  rootContractId?: string
  ra?: number
  rb?: number
  rc?: number
  rd?: number
  pc?: number
  is?: number
  ptr?: number
  len?: number
  digest?: string
  data?: string
}
/** The block header contains metadata about a certain block. */
export interface Block {
  /** String of the header */
  id: string
  /** The block height for the data availability layer up to which (inclusive) input messages are processed. */
  daHeight: number
  consensusParametersVersion: number
  stateTransitionBytecodeVersion: number
  /** The number of transactions in the block. */
  transactionsCount: string
  /** The number of receipt messages in the block. */
  messageReceiptCount: string
  /** The merkle root of the transactions in the block. */
  transactionsRoot: string
  messageOutboxRoot: string
  eventInboxRoot: string
  /** The block height. */
  height: number
  /** The merkle root of all previous consensus header Stringes (not including this block). */
  prevRoot: string
  /** The timestamp for the block. */
  time: number
  /** The String of the serialized application header for this block. */
  applicationHash: string
}
/** An object containing information about a transaction. */
export interface Transaction {
  /** block the transaction is in. */
  blockHeight: number
  /** A unique transaction id. */
  id: string
  /** An array of asset ids used for the transaction inputs. */
  inputAssetIds?: Array<string>
  /** An array of contracts used for the transaction inputs. */
  inputContracts?: Array<string>
  /**
   * A contract used for the transaction input.
   * A unique 32 byte identifier for the UTXO for a contract used for the transaction input.
   */
  inputContractUtxoId?: string
  /** The root of amount of coins owned by contract before transaction execution for a contract used for the transaction input. */
  inputContractBalanceRoot?: string
  /** The state root of contract before transaction execution for a contract used for the transaction input. */
  inputContractStateRoot?: string
  /** A pointer to the TX whose output is being spent for a contract used for the transaction input. */
  inputContractTxPointerBlockHeight?: number
  /** A pointer to the TX whose output is being spent for a contract used for the transaction input. */
  inputContractTxPointerTxIndex?: number
  /** The contract id for a contract used for the transaction input. */
  inputContract?: string
  policiesTip?: number
  policiesWitnessLimit?: number
  policiesMaturity?: number
  policiesMaxFee?: number
  scriptGasLimit?: number
  /** The minimum block height that the transaction can be included at. */
  maturity?: number
  /** The amount minted in the transaction. */
  mintAmount?: number
  /** The asset ID for coins minted in the transaction. */
  mintAssetId?: string
  mintGasPrice?: number
  /** The location of the transaction in the block. */
  txPointerBlockHeight?: number
  txPointerTxIndex?: number
  /** Script, creating a new contract, or minting new coins */
  txType: number
  /** The index of the input from a transaction that changed the state of a contract. */
  outputContractInputIndex?: number
  /** The root of amount of coins owned by contract after transaction execution from a transaction that changed the state of a contract. */
  outputContractBalanceRoot?: string
  /** The state root of contract after transaction execution from a transaction that changed the state of a contract. */
  outputContractStateRoot?: string
  /** An array of witnesses. */
  witnesses?: string
  /** The root of the receipts. */
  receiptsRoot?: string
  /** The status type of the transaction. */
  status: number
  /** for SubmittedStatus, SuccessStatus, and FailureStatus, the time a transaction was submitted, successful, or failed */
  time: number
  /**
   * for SuccessStatus, the state of the program execution
   * for SqueezedOutStatus & FailureStatus, the reason the transaction was squeezed out or failed
   */
  reason?: string
  /** The script to execute. */
  script?: string
  /** The script input parameters. */
  scriptData?: string
  /** The witness index of contract bytecode. */
  bytecodeWitnessIndex?: number
  bytecodeRoot?: string
  subsectionIndex?: number
  subsectionsNumber?: number
  proofSet?: string
  consensusParametersUpgradePurposeWitnessIndex?: number
  consensusParametersUpgradePurposeChecksum?: string
  stateTransitionUpgradePurposeRoot?: string
  /** The salt value for the transaction. */
  salt?: string
}
/** An object representing all possible types of receipts. */
export interface Receipt {
  /** Index of the receipt in the block */
  receiptIndex: number
  /** Contract that produced the receipt */
  rootContractId?: string
  /** transaction that this receipt originated from */
  txId: string
  /** The status type of the transaction this receipt originated from */
  txStatus: number
  /** block that the receipt originated in */
  blockHeight: number
  /** The value of the program counter register $pc, which is the memory address of the current instruction. */
  pc?: string
  /** The value of register $is, which is the pointer to the start of the currently-executing code. */
  is?: string
  /** The recipient contract */
  to?: string
  /** The recipient address */
  toAddress?: string
  /** The amount of coins transferred. */
  amount?: bigint
  /** The asset id of the coins transferred. */
  assetId?: string
  /** The gas used for the transaction. */
  gas?: number
  /** The first parameter for a CALL receipt type, holds the function selector. */
  param1?: bigint
  /** The second parameter for a CALL receipt type, typically used for the user-specified input to the ABI function being selected. */
  param2?: bigint
  /** The value of registers at the end of execution, used for debugging. */
  val?: bigint
  /** The value of the pointer register, used for debugging. */
  ptr?: bigint
  /** A 32-byte String of MEM[$rC, $rD]. The syntax MEM[x, y] means the memory range starting at byte x, of length y bytes. */
  digest?: string
  /** The decimal string representation of an 8-bit unsigned integer for the panic reason. Only returned if the receipt type is PANIC. */
  reason?: number
  /** The value of register $rA. */
  ra?: bigint
  /** The value of register $rB. */
  rb?: bigint
  /** The value of register $rC. */
  rc?: bigint
  /** The value of register $rD. */
  rd?: bigint
  /** The length of the receipt. */
  len?: bigint
  /** The type of receipt. */
  receiptType: number
  /** 0 if script exited successfully, any otherwise. */
  result?: number
  /** The amount of gas consumed by the script. */
  gasUsed?: number
  /** The receipt data. */
  data?: string
  /** The address of the message sender. */
  sender?: string
  /** The address of the message recipient. */
  recipient?: string
  /** The nonce value for a message. */
  nonce?: string
  /** Current context if in an internal context. null otherwise */
  contractId?: string
  /** The sub id. */
  subId?: string
}
/** An object representing all possible types of inputs.  InputCoin, InputContract, InputMessage */
export interface Input {
  /** transaction that this input originated from */
  txId: string
  /** The status type of the transaction this receipt originated from */
  txStatus: number
  /** block that the input originated in */
  blockHeight: number
  /** InputCoin, InputContract, or InputMessage */
  inputType: number
  /** A unique 32 byte identifier for the UTXO. */
  utxoId?: string
  /** The owning address or predicate root. */
  owner?: string
  /**
   * for InputCoin type: The amount of coins.
   * for InputMessage type: The amount sent in the message.
   */
  amount?: bigint
  /** The asset ID of the coins. */
  assetId?: string
  /** A pointer to the transaction whose output is being spent. */
  txPointerBlockHeight?: number
  txPointerTxIndex?: number
  /** The index of the witness that authorizes spending the coin. */
  witnessIndex?: number
  /** The amount of gas used in the predicate transaction. */
  predicateGasUsed?: number
  /** The predicate bytecode. */
  predicate?: string
  /** The predicate input parameters. */
  predicateData?: string
  /** The root of amount of coins owned by contract before transaction execution. */
  balanceRoot?: string
  /** The state root of contract before transaction execution. */
  stateRoot?: string
  /** The input contract. */
  contract?: string
  /** The sender address of the message. */
  sender?: string
  /** The recipient address of the message. */
  recipient?: string
  /** A nonce value for the message input, which is determined by the sending system and is published at the time the message is sent. */
  nonce?: string
  /** The message data. */
  data?: string
}
/** An object representing all possible types of Outputs. CoinOutput, ContractOutput, ChangeOutput, VariableOutput, ContractCreated */
export interface Output {
  /** transaction that this out originated from */
  txId: string
  /** The status type of the transaction this receipt originated from */
  txStatus: number
  /** block that the output originated in */
  blockHeight: number
  /** CoinOutput, ContractOutput, ChangeOutput, VariableOutput, or ContractCreated */
  outputType: number
  /** The address the coins were sent to. */
  to?: string
  /** The amount of coins in the output. */
  amount?: bigint
  /** The asset id for the coins sent. */
  assetId?: string
  /** The index of the input. */
  inputIndex?: number
  /** The root of amount of coins owned by contract after transaction execution. */
  balanceRoot?: string
  /**
   * for ContractedCreated type: The initial state root of contract.
   * for ContractOutput type: The state root of contract after transaction execution.
   */
  stateRoot?: string
  /** for ContractCreated type: The contract that was created. */
  contract?: string
}
export class HyperfuelClient {
  /** Create a new client with given config */
  static new(cfg: Config): HyperfuelClient
  /** Get the height of the source hyperfuel instance */
  getHeight(): Promise<number>
  /**
   * Get the height of the source hyperfuel instance
   * Internally calls get_height.
   * On an error from the source hyperfuel instance, sleeps for
   * 1 second (increasing by 1 each failure up to max of 5 seconds)
   * and retries query until success.
   */
  getHeightWithRetry(): Promise<number>
  /**
   * Create a parquet file by executing a query.
   *
   * Path should point to a folder that will contain the parquet files in the end.
   */
  createParquetFolder(query: Query, path: string): Promise<void>
  /**
   * Send a query request to the source hyperfuel instance.
   *
   * Returns a query response which contains typed data.
   *
   * NOTE: this query returns loads all transactions that your match your receipt, input, or output selections
   * and applies the field selection to all these loaded transactions.  So your query will return the data you
   * want plus additional data from the loaded transactions.  This functionality is in case you want to associate
   * receipts, inputs, or outputs with eachother.
   */
  getData(query: Query): Promise<QueryResponseTyped>
  /**
   * Send a query request to the source hyperfuel instance.
   *
   * Returns a query response that which contains structured data that doesn't include any inputs, outputs,
   * and receipts that don't exactly match the query's input, outout, or receipt selection.
   */
  getSelectedData(query: Query): Promise<QueryResponseTyped>
  /**
   * Send a query request to the source hyperfuel instance.
   *
   * Returns all log and logdata receipts of logs emitted by any of the specified contracts
   * within the block range.
   * If no 'to_block' is specified, query will run to the head of the chain.
   * Returned data contains all the data needed to decode Fuel Log or LogData
   * receipts as well as some extra data for context.  This query doesn't return any logs that
   * were a part of a failed transaction.
   *
   * NOTE: this function is experimental and might be removed in future versions.
   */
  presetQueryGetLogs(emittingContracts: Array<string>, fromBlock: number, toBlock?: number | undefined | null): Promise<LogResponse>
}
