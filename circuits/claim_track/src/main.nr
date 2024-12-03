// use claim_library::utils;

#[oracle(call_can_claim_top_tracks)]
unconstrained fn can_claim_top_tracks(_auth: str<350>,_track_id:str<22>,_time_range:u8, _list_range:u8 ) -> bool {}

unconstrained fn call_can_claim_top_tracks(auth: str<350>,track_id:str<22>,time_range:u8, list_range:u8 ) -> bool {
    can_claim_top_tracks(auth,track_id,time_range, list_range)
   //true
}

fn main(auth: str<350>,track_id:str<22>,limit:u8, range:u8) {
    let claim_result = call_can_claim_top_tracks(auth,track_id,limit, range);
    assert(claim_result == true);
}



#[test]
fn test_main() {
    let auth: str<350> ="BQDWSolX6qEJw8zVDOcVShEHoA-w_QAPjgBxToygok-lnWwSiiQCz-drwLVhJVOw5sH37LmYsYJQYRccmBC8eACO-hpe6dwsCZzkLf-j68dblFQ0ucm4T7HW6RIZpxDjU40GVmiRsQouBCarjT9RG8tH5FD8-FW4bYQDRyHgp3VnM3ojYAbIVk2-IHvXTvisTihM-PRJqh16U3engMjw6ZG6MXzIEgE47f04vlvWKXqyJKNSU_AwSLuBhZdOv-ICIWKX3qJuc0SGmNyrzgr0ze_nvSxskNhmEZh701LRdbwoXEldhpNJtoNGcBciQPaBbLnsCfcJgKSYryvoxgU8jSw1qmc   ";
    let track_id:str<22> = "4B4CQ84BBpHK5d02cWKUb0";
    let limit:u8 = 0;
    let range:u8 = 10; 
    main(
      auth,track_id,limit,range
    );
}
