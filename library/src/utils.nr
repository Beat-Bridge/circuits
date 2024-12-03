use dep::std;
    pub fn not_equal(x: Field, y: Field) -> bool {
        x != y
    }


    pub fn  bool_to_u8(value: bool) -> u8 {
        value as u8
    }

    pub fn  u8_to_bool(value: u8) -> bool {
        if(value > 1) {
            false
        }
        value as bool
    }

    pub fn construct_claim_payload(subject_eth_address: [u8; 20], can_claim: bool) -> [u8; 32] {
        assert(can_claim == true);
        let mut packed_bytes: [u8; 21] = [0; 21];
        for i in 0..20 {
            packed_bytes[i] = subject_eth_address[i];
        }
        let can_claim_bytes = bool_to_u8(can_claim);
        packed_bytes[20] = can_claim_bytes;
        let hash = std::hash::keccak256(packed_bytes, 21);
        hash
    }