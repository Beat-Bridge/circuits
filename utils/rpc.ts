import { JSONRPCClient } from "json-rpc-2.0";

const client: any = new JSONRPCClient(async jsonRPCRequest => {
  console.log(jsonRPCRequest);
  const response = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  });
  
  console.log(response);

  if (response.status === 200) {
    const jsonRPCResponse = await response.json();
    return client.receive(jsonRPCResponse);
  }

  if (jsonRPCRequest.id !== undefined) {
    throw new Error(response.statusText);
  }
});

export const foreignCallHandler = async (name: string, input: any[]) => {
  console.log("name", name);
  console.log("input", ...input);
  // notice that the "inputs" parameter contains *all* the inputs
  // in this case we to make the RPC request with the first parameter "numbers", which would be input[1]
  const oracleReturn = await client.request("resolve_foreign_call", [
    {
      function: name,
      inputs: [...input],
    },
  ]);

  console.log("oracleReturn", oracleReturn);
  return [oracleReturn.values[0]];
};
