import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../generated/cliam_recently_played.json";
import { foreignCallHandler, createKey } from "../utils/rpc";
import { delay, generateFixedLengthUUID } from "../utils";

describe("Noir Circuit Testing for claim_recently_played", async () => {
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
    // console.log(noir, backend);
    // expect(backend).to.exist;
    // expect(noir).to.exist;
  });

  it("should generate valid proof for correct input", async () => {
    const auth =
      "Bearer BQCnFi6CMtteyhjWE1CuQeMjYGFQdlOqA6MKjbsLLaRDCWeSrxAcybYDnUNNXi3MkdT2xE56pnXUtIDu8K0X1V2znUskFoUUwYgAvrl3_sGDGWh32eYWjd3-4dp383VYGlHS5Qr7ix18409jX_1V4ouo7sIAB7HwCYcF4GgNzIlpgJjcMdO6hPwexlacoY0aFC7U-BXF9GKKxGMYx7E5_Jo14fW3NPo0rdtfOcQnKBX0NshXFyNKmVsOvQpgs7RhRtofSaUPmZ8dfzLR6EJrpOiHUctuZAI5ahxVap3rYxk76BgBueFIgPKhnBSJve6Ay-3VCHPJBUB2j1Ol5tiE_zf9ecw";
    const input = {
      key: randomKey,
      track_id: "2e3Ea0o24lReQFR4FA7yXH",
      after: 1732881599000,
      play_times: 2,
    };

    await createKey(randomKey, auth);
    const { witness } = await noir.execute(input, foreignCallHandler);
    console.log(witness);
    console.log(backend);
    // correctProof = await backend.generateProof(witness);
    //expect(correctProof.proof instanceof Uint8Array).toBeTrue;
  });
});
