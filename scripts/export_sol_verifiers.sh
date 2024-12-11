#!/bin/bash

if ! command -v nargo &> /dev/null
then
    echo "nargo could not be found, exiting..."
    echo ""
    exit 2
fi

echo "exporting sol verifiers..."
# rm ./contracts/verifiers/*
for d in circuits/*/ ; do
  echo $d
  cd $d
  nargo compile
  bb write_vk -b ./target/$(basename $d).json 
  bb contract
  mv target/contract.sol ../../contracts/verifiers/$(basename $d).sol
  # rm  /contract.sol && vk
  cd ../..
done
