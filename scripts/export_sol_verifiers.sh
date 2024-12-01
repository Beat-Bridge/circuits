#!/bin/bash

if ! command -v nargo &> /dev/null
then
    echo "nargo could not be found, exiting..."
    echo ""
    exit 2
fi

# Ensure the verifiers folder exists
echo "Ensuring the verifiers folder exists..."
if [ ! -d "../../contracts/verifiers" ]; then
    echo "Directory ../../contracts/verifiers does not exist. Attempting to create it..."
    mkdir -p ../../contracts/verifiers 2>/dev/null

    # Check if mkdir failed due to permission issues
    if [ $? -ne 0 ]; then
        echo "Permission denied. Retrying with sudo..."
        sudo mkdir -p ../../contracts/verifiers
        if [ $? -ne 0 ]; then
            echo "Failed to create ../../contracts/verifiers even with sudo. Exiting..."
            exit 1
        fi
    fi
fi

# Clear existing verifiers
echo "Exporting sol verifiers..."
rm -f ../../contracts/verifiers/*

# Process circuits
for d in circuits/*/ ; do
  echo "Processing circuit in directory: $d"
  cd $d
  nargo codegen-verifier

  # Move the verifier
  mv contract/$(basename $d)/plonk_vk.sol ../../contracts/verifiers/$(basename $d).sol

  # Clean up
  rm -rf contract/
  cd ../..
done

echo "Done exporting verifiers."