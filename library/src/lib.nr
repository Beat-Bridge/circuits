mod utils {
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
}


#[test]
fn test_u8_to_bool() {
   let a :u8 =  0;
   let b :u8 = 1;
   assert(utils::u8_to_bool(a) == false);
   assert(utils::u8_to_bool(b) == true);
   assert(utils::u8_to_bool(10) == false);
}

#[test]
fn test_bool_to_u8() {
   let a : bool=  true;
   let b : bool = false;
   assert(utils::bool_to_u8(a) == 1);
   assert(utils::bool_to_u8(b) == 0);
}

#[test]
fn test_construct_claim() {
    let expected = [0xd3, 0x72, 0x47, 0x53, 0x00, 0x9c, 0xc1, 0x6f, 0x92, 0x51, 0x5b, 0xce, 0xe4, 0x0f, 0x1d, 0xd2, 0x4a, 0x9b, 0xc7, 0x99, 0x52, 0xd7, 0xd6, 0x2d, 0x0d, 0x05, 0x6d, 0x9f, 0x0a, 0x47, 0x54, 0x12];
    let eth_address = [ 0x0a, 0x66, 0xfb, 0x34, 0xd3, 0x0c, 0x2b, 0x88, 0x9a, 0x12, 0xb1, 0xf8, 0x15, 0x73, 0xe4, 0x7f, 0x37, 0xde, 0x34, 0x0e ];
    let actual = utils::construct_claim_payload(eth_address, true);
    assert(expected == actual);
}


#[test]
fn test_not_equal() {
    assert(utils::not_equal(1, 2));

    // Uncomment to make test fail
    // assert(not_equal(1, 1));
}
