var dispatch = require('./lib/index');

// CLASSES
// queue(num_workers);
// task(function, callback_function)
// group()

// create a queue
var linearQueue = dispatch.serialQueue('My Linear Queue');
var concurrentQueue = dispatch.queue('My Concurrent Queue', 5);
var workGroup = dispatch.group("Work Group");

// create a task
linearQueue.push(function(task) {
	console.log("Starting Task w/ object");
	console.log(task);
	console.log("*******");
	setTimeout(function() {
		task.done();
		}, 2000);
	});
linearQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
linearQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
linearQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
linearQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);}, workGroup);
linearQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});

concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 3000);}, workGroup);
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});
concurrentQueue.push(function(task) { setTimeout(function() {task.done();}, 2000);});

linearQueue.on('empty', function() { console.log("Linear queue empty."); });
concurrentQueue.on('empty', function() { console.log("Concurrent queue empty."); });
workGroup.on('complete', function() { console.log("Work group complete.");});