// QUnit.test( "hello test", function( assert ) {
//   assert.ok( 1 == "1", "Passed!" );
// });

// test("prettydate basics", function() {
//         var now = "2008/01/28 22:25:00";
//         equal(prettyDate(now, "2008/01/28 22:24:30"), "just now");
//         equal(prettyDate(now, "2008/01/28 22:23:30"), "1 minute ago");
//         equal(prettyDate(now, "2008/01/28 21:23:30"), "1 hour ago");
//         equal(prettyDate(now, "2008/01/27 22:23:30"), "Yesterday");
//         equal(prettyDate(now, "2008/01/26 22:23:30"), "2 days ago");
//         equal(prettyDate(now, "2007/01/26 22:23:30"), undefined);
// });

QUnit.test( "getLatLong", function( assert ) {
  var sf = {lat: 37.7749295, lng: -122.4194155};
  var ny = {lat: 40.7127837, lng: -74.0059413};
  var whitehouse = {lat: 38.8976094, lng: -77.0367349};
  assert.propEqual( getLatLong("san francisco"), sf );
  assert.propEqual( getLatLong("new york"), ny );
  assert.propEqual( getLatLong("1600 Pennsylvania Avenue Northwest, Washington, DC"), whitehouse );
});
