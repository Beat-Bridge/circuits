import { expect } from "chai";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../generated/cliam_artist.json";
import { foreignCallHandler, createKey } from "../utils/rpc";
import { delay, generateFixedLengthUUID } from "../utils";

describe("Noir Circuit Testing for claim_artist", async () => {
  let noir: Noir;
  let backend: BarretenbergBackend;
  //let correctProof: ProofData;
  let randomKey: string;

  before(async () => {
    backend = new BarretenbergBackend(circuit as any);
    noir = new Noir(circuit as any);
    randomKey = generateFixedLengthUUID(16);
  });

  it("should initialize the backend and Noir instances correctly", async function () {
    expect(backend);
    expect(noir);
  });

  it("should generate valid proof for correct input", async () => {
    const auth =
      "BQCQRQl-Hd-qHYM7UTvgXSiYjuFdxFDWiiJQ5KGJPHcgwNC8S_UwdcHWQAIVFNrKUmqnvMuvh-0p11ju5_f8BGGd2NnoVmGeaVLCRsIh2UVtVTWEmSmJnj37H41t0b12PU9Do5vPjMtavI54nHK5eAltrp2maYIRxUnwX_nIeutmrvD2D_dUF-oRrQRdkTUmt0eYe-wSLy-5VBlQRrZGY1pCwGRZwIs4JIWEcQNX_nOCOiKisrPO8HS7GRVjUiknHzHBUKJfsIvT9FBYlwpvYMOSh4dLyoTU_fpHU9kItlLQIbnCRJSAMq7YKI8CZDC2NGMm6PogqspVeqI8Cwlf5gbfPfQ";
    const input = {
      key: randomKey,
      artist_id: "4B4CQ84BBpHK5d02cWKUb0",
      limit: 0,
      range: 10,
    };

    await createKey(randomKey, auth);
    await delay(1000);
    const { witness } = await noir.execute(input, foreignCallHandler);
    console.log(witness);
    // correctProof = await backend.generateProof(witness);
    //expect(correctProof.proof instanceof Uint8Array).toBeTrue;
  });
});
