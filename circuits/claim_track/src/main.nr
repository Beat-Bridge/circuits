use dep::std;

#[oracle(can_claim_top_tracks)]
unconstrained fn can_claim_top_tracks(auth: str<350>,track_id:str<22>,limit:u8, range:u8 ) -> bool {}

unconstrained fn call_can_claim_top_tracks(auth: str<350>,track_id:str<22>,limit:u8, range:u8 ) -> bool {
    can_claim_top_tracks(auth,track_id,limit, range)
}
fn main(auth: str<350>,track_id:str<22>,limit:u8, range:u8) {
    let claim_result = call_can_claim_top_tracks(auth,track_id,limit, range);
    //assert(claim_result, true);
   // println(claim_result);
}

#[test]
fn test_main() {
    let auth: str<350> ="BQDWSolX6qEJw8zVDOcVShEHoA-w_QAPjgBxToygok-lnWwSiiQCz-drwLVhJVOw5sH37LmYsYJQYRccmBC8eACO-hpe6dwsCZzkLf-j68dblFQ0ucm4T7HW6RIZpxDjU40GVmiRsQouBCarjT9RG8tH5FD8-FW4bYQDRyHgp3VnM3ojYAbIVk2-IHvXTvisTihM-PRJqh16U3engMjw6ZG6MXzIEgE47f04vlvWKXqyJKNSU_AwSLuBhZdOv-ICIWKX3qJuc0SGmNyrzgr0ze_nvSxskNhmEZh701LRdbwoXEldhpNJtoNGcBciQPaBbLnsCfcJgKSYryvoxgU8jSw1qmc   ";
    let track_id:str<22> = "4B4CQ84BBpHK5d02cWKUb0";
    let limit:u8 = 0;
    let range:u8 = 0; 
    main(
      auth,track_id,limit,range
    );
}
