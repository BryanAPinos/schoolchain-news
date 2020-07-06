import { context, logging, storage, PersistentMap } from "near-sdk-as";
// available class: context, storage, logging, base58, base64,
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage } from "./model";

const DEFAULT_MESSAGE = "Hello";
const balances = new PersistentMap<string, u64>("b:");

const TOTAL_SUPPLY: u64 = 1000000;
export function init(initialOwner: string): void {
  logging.log("initialOwner: " + initialOwner);
  assert(
    storage.get<string>("init") == null,
    "Already initialized token supply"
  );
  balances.set(initialOwner, TOTAL_SUPPLY);
  storage.set("init", "done");
}

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage();
  let greetingPrefix = storage.get<string>(account_id);
  if (!greetingPrefix) {
    greetingPrefix = DEFAULT_MESSAGE;
  }
  const s = printString(account_id);
  message.text = greetingPrefix + " " + s;
  return message;
}

export function setGreeting(message: string): void {
  storage.set(context.sender, message);
}

function printString(s: string): string {
  return s;
}

export function balanceOf(tokenOwner: string): u64 {
  logging.log("balanceOf: " + tokenOwner);
  if (!balances.contains(tokenOwner)) {
    return 0;
  }
  const result = balances.getSome(tokenOwner);
  return result;
}

function getBalance(owner: string): u64 {
  return balances.contains(owner) ? balances.getSome(owner) : 0;
}
