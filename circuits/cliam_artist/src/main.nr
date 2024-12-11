// use claim_library::utils;

#[oracle(can_claim_top_artist)]
unconstrained fn can_claim_top_artist(_key: str<16>,_artist_id:str<22>,_time_range:u8, _list_range:u8 ) -> Field {}

unconstrained fn call_can_claim_top_artist(key: str<16>,artist_id:str<22>,time_range:u8, list_range:u8 ) -> Field {
    can_claim_top_artist(key,artist_id,time_range, list_range)
}

fn main(key: str<16>,artist_id:str<22>,limit:u8, range:u8) {
    let claim_result =   unsafe {call_can_claim_top_artist(key,artist_id,limit, range)};
    assert(claim_result  == 1);
}


#[test]
fn test_main() {
    let key: str<16> ="2a4d2d1fbda14398";
    let artist_id:str<22> = "4B4CQ84BBpHK5d02cWKUb0";
    let limit:u8 = 0;
    let range:u8 = 10; 
    main(
      key,artist_id,limit,range
    );
}