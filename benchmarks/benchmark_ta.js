var Benchmark = require('benchmark');

exports.startBenchMark = function(){

	var suite = new Benchmark.Suite;
	
	Benchmark.prototype.setup = function() {
		var length = 65536;
		var temp_typed_array = new Float32Array(length);
		var temp_array = new Array(length);
		for(var i=0; i<length; ++i) {
		  temp_typed_array[i] = temp_array[i] = i/7;
		}
			  
		var access_array = new Array(1024);
		for(var i=0; i<access_array.length; ++i)
		  access_array[i] = Math.floor(Math.random() * length);
		
		var temp = 0;
	  };
	  
	suite.add('TypedArrayTest - Random', function() {
		for(var i=0; i<1024; ++i)
		  temp += temp_typed_array[access_array[i]];
	})
	.add('ArrayTest - Random', function() {
		for(var i=0; i<1024; ++i)
		  temp += temp_array[access_array[i]];
	})	
	.on('cycle', function(event) {
	  console.log(String(event.target));
	})
	.on('complete', function() {
	  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	  console.log("************Typed Array - Random - Test ends here********************");
	})
	.run({ 'async': true });	

	
	
	suite.add('TypedArrayTest - Sequential', function() {
		for(var i=0; i<1024; ++i)
		  temp += temp_typed_array[i];
	})
	.add('ArrayTest - Sequential', function() {
		for(var i=0; i<1024; ++i)
		  temp += temp_array[i];
	})	
	.on('cycle', function(event) {
	  console.log(String(event.target));
	})
	.on('complete', function() {
	  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	  console.log("************Typed Array - Sequential - Test ends here********************");
	})
	.run({ 'async': true });	
	
}
