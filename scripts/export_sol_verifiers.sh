#!/bin/bash

if ! command -v nargo &> /dev/null
then
    echo "nargo could not be found, exiting..."
    echo ""
    exit 2
fi

echo "exporting sol verifiers..."
rm ./contracts/verifiers/*
for d in circuits/*/ ; do
  echo $d
  cd $d
  nargo codegen-verifier
  mv contract/$(basename $d)/plonk_vk.sol ../../contracts/verifiers/$(basename $d).sol
  cd ../..
done
