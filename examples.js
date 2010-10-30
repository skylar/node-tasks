var dispatch = require('./lib/dispatch');

// CLASSES
// queue(num_workers);
// task(function, callback_function)
// group()

// create a queue
var linearQueue = dispatch.serialQueue('My Linear Queue');
var concurrentQueue = dispatch.queue(5, 'My Concurrent Queue');

// create a task
var aTask = dispatch.task(function(t) { workHard(); t.done(); });
aTask.on('complete', callback);

// add jobs
queue.push( function(t) {} );
queue.push( aTask );

queue.after(60, aTask);
queue.apply(10, function(t,k) { workWith(k); t.done();} );

// control
queue.suspend();
queue.resume();
queue.on('empty', finalize);

// properties
print("My queue has " + queue.concurrency_count() + " workers.");


// create a group
var aGroup = dispatch.group('Crawlers');

// associate tasks with groups
var groupTask = dispatch.task(function(t) { workHard(); t.done();}, aGroup)
queue.push(aTask);
queue.push(function(t) {work(); t.done();}, aGroup);

// control
group.on('complete', callback);

