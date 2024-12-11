import { JSONRPCClient } from "json-rpc-2.0";
import axios from "axios";

const client: any = new JSONRPCClient(async jsonRPCRequest => {
  try {
    const response = await axios.post("http://localhost:3000", jsonRPCRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const jsonRPCResponse = response.data;
      return client.receive(jsonRPCResponse);
    }
  } catch (error: any) {
    if (jsonRPCRequest.id !== undefined) {
      throw new Error(error.response?.statusText || error.message);
    }
  }
});

/**
 * foreignCallHandler is a function that takes the name of a foreign function
 * and an array of input values to that function. It makes an RPC request
 * to the backend with the function name and the input values, and then
 * returns the result of that RPC request.
 * @param name {string} the name of the foreign function
 * @param input {any[]} an array of input values
 * @returns {Promise<any[]>} a promise that resolves to an array containing
 * the result of the RPC request
 */
export const foreignCallHandler = async (name: string, input: any[]) => {
  try {
    const oracleReturn = await client.request("resolve_foreign_call", [
      {
        function: name,
        inputs: [...input],
      },
    ]);
    return [oracleReturn.values[0]];
  } catch (error) {
    console.error(error);
    return ["1"];
  }
};

export const foreignCallHandleFailed = async (name: string, input: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  () => [name, input];
  return ["0"];
};
/**
 * Sends a request to store a key with the given id and token.
 *
 * @param id - The identifier for the key to be stored.
 * @param token - The authentication token associated with the key.
 *
 * @returns A promise that resolves to the stored key.
 */
export const createKey = async (id: string, token: string) => {
  const key = await client.request("store_key", [id, token]);
  return key;
};
