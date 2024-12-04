import { expect } from "chai";
import { BarretenbergBackend, BarretenbergVerifier as Verifier } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { ProofData } from "@noir-lang/types";
import { claim_track as circuit } from "../generated/claim_track.json";
import {foreignCallHandler} from "../utils/rpc";

describe("Noir Circuit Testing", async () => {
  let noir: Noir;
  let backend: BarretenbergBackend;
  //let correctProof: ProofData;

  before(async () => {
    backend = new BarretenbergBackend(circuit as any);
    noir = new Noir(circuit as any);
    console.log("top before");
  });

  it("should initialize the backend and Noir instances correctly", async function () {
    // console.log(noir, backend);
    // expect(backend).to.exist;
    // expect(noir).to.exist;
  });

  it("should generate valid proof for correct input", async () => {
    const input = {
      auth: "BQDWSolX6qEJw8zVDOcVShEHoA-w_QAPjgBxToygok-lnWwSiiQCz-drwLVhJVOw5sH37LmYsYJQYRccmBC8eACO-hpe6dwsCZzkLf-j68dblFQ0ucm4T7HW6RIZpxDjU40GVmiRsQouBCarjT9RG8tH5FD8-FW4bYQDRyHgp3VnM3ojYAbIVk2-IHvXTvisTihM-PRJqh16U3engMjw6ZG6MXzIEgE47f04vlvWKXqyJKNSU_AwSLuBhZdOv-ICIWKX3qJuc0SGmNyrzgr0ze_nvSxskNhmEZh701LRdbwoXEldhpNJtoNGcBciQPaBbLnsCfcJgKSYryvoxgU8jSw1qmc   ",
      track_id: "4B4CQ84BBpHK5d02cWKUb0",
      limit: 0,
      range: 10,
    };
    const { witness } = await noir.execute(input, foreignCallHandler);
   // correctProof = await backend.generateProof(witness);
    //expect(correctProof.proof instanceof Uint8Array).toBeTrue;
  });
});
