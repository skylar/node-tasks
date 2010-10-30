var dispatch = require('./lib/dispatch');

// CLASSES
// queue(num_workers);
// task(function, callback_function)
// group()

// create a queue
var linearQueue = dispatch.serialQueue('My Linear Queue');
var concurrentQueue = dispatch.queue(5, 'My Concurrent Queue');

// create a task
var aTask = dispatch.task(function() { workHard(); });
aTask.on('complete', callback);

// add jobs
queue.push( function() {} );
queue.push( aTask );

queue.after(60, aTask);
queue.apply(10, function(k) { workWith(k);} );

// control
queue.suspend();
queue.resume();
queue.on('empty', finalize);

// properties
print("My queue has " + queue.concurrency_count() + " workers.");


// create a group
var aGroup = dispatch.group('Crawlers');

// associate tasks with groups
var groupTask = dispatch.task(function() { workHard();}, aGroup)
queue.push(aTask);
queue.push(function() {work();}, aGroup);

// control
group.on('complete', callback);

