import { expect } from "chai";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../generated/cliam_artist.json";
import { foreignCallHandler, createKey, foreignCallHandleFailed } from "../utils/rpc";
import { generateFixedLengthUUID } from "../utils";
import { ProofData } from "@noir-lang/types";

describe("Noir Circuit Testing for claim_artist", async () => {
  let noir: Noir;
  let backend: BarretenbergBackend;
  let correctProof: ProofData;
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
      "Bearer BQCnFi6CMtteyhjWE1CuQeMjYGFQdlOqA6MKjbsLLaRDCWeSrxAcybYDnUNNXi3MkdT2xE56pnXUtIDu8K0X1V2znUskFoUUwYgAvrl3_sGDGWh32eYWjd3-4dp383VYGlHS5Qr7ix18409jX_1V4ouo7sIAB7HwCYcF4GgNzIlpgJjcMdO6hPwexlacoY0aFC7U-BXF9GKKxGMYx7E5_Jo14fW3NPo0rdtfOcQnKBX0NshXFyNKmVsOvQpgs7RhRtofSaUPmZ8dfzLR6EJrpOiHUctuZAI5ahxVap3rYxk76BgBueFIgPKhnBSJve6Ay-3VCHPJBUB2j1Ol5tiE_zf9ecw";
    const input = {
      key: randomKey,
      artist_id: "12kjvw4e3gLp6qVHO65n7W",
      limit: 0,
      range: 10,
    };

    const key = await createKey(randomKey, auth);
    const { witness } = await noir.execute(input, foreignCallHandler);
    console.log(witness, key);
    correctProof = await backend.generateProof(witness);
    // expect(correctProof.proof).to.be.instanceOf(Uint8Array);
  });

  it("should not generate valid proof for incorrect input", async () => {
    const input = {
      key: randomKey,
      artist_id: "12kjvw4e3gLp6qVHO65n7W",
      limit: 0,
      range: 10,
    };
    try {
      await noir.execute(input, foreignCallHandleFailed);
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      const error = err as Error;
      expect(error.message).to.include("Cannot satisfy constraint");
    }
  });
});
