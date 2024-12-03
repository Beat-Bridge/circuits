import { expect } from "chai";
import { BarretenbergBackend, BarretenbergVerifier as Verifier } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { claim_track as circuit } from "../generated/claim_track.json";


describe("Noir Circuit Testing", async () => {
  let noir: Noir;
  let backend: BarretenbergBackend;

  before(async () => {
    backend = new BarretenbergBackend(circuit as any);
    noir = new Noir(circuit as any);
    console.log("top before");
  });

  it("should initialize the backend and Noir instances correctly", async function () {
    console.log(noir, backend);
    expect(backend).to.exist;
    expect(noir).to.exist;
  });
});
