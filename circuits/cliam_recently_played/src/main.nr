
#[oracle(can_claim_recently_played_track)]
unconstrained fn can_claim_recently_played_track(_key: str<16>,_track_id:str<22>,_after:u64, _play_times:u8 ) -> Field {}

unconstrained fn call_can_claim_top_artist(key: str<16>,track_id:str<22>,after:u64, play_times:u8 ) -> Field {
    can_claim_recently_played_track(key,track_id,after, play_times)
}


fn main(key: str<16>,track_id:str<22>,after:u64, play_times:u8) {
    let claim_result = unsafe{ call_can_claim_top_artist(key,track_id,after,play_times) };
    assert(claim_result  == 1);
}


#[test]
fn test_main() {
    let key: str<16> ="2a4d2d1fbda14398";
    let track_id:str<22> = "4B4CQ84BBpHK5d02cWKUb0";
    let after:u64 = 1732881599000;
    let play_time:u8 = 10; 
    main(
      key,track_id,after,play_time
    );
}