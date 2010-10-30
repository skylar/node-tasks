// transform any object into an emitter
var emitterify = function(object) {
	var EventEmitter = require('events').EventEmitter;
	var emitter = new EventEmitter;

	require('events').EventEmitter.call(object);
	object.emit = emitter.emit;
	object.addListener = emitter.addListener;
	object.on = emitter.on;
	object.removeListener = emitter.removeListener;
	object.removeAllListeners = emitter.removeAllListeners;
	object.listeners = emitter.listeners;
}

var create_group = function(name) {
	var that = {name: name},
		my = {tasks: {}, taskCount:0};
	
	emitterify(that);
	that.add = function(task) {
		my.tasks[task.id] = 1;
		my.taskCount+=1;
	};
	
	that.remove = function(task) {
		if(my.tasks[task.id]) {
			delete my.tasks[task];
			my.taskCount-=1;
			
			if(0 === my.taskCount) {
				that.emit('complete');
			}
		}
	};
	
	return that;
};
exports.group = create_group;

var taskCounter = 1;
var create_task = function(method, group) {
	var that = {method:method, group:group, id: taskCounter++},
		my = {};
	
	// must inherit from EventEmitter
	//var emitter = require('events').EventEmitter;	
	// that = Object.beget(emitter);
	// require('events').EventEmitter.call(that);
	//  	that.method = method;
	// that.group = group;
	emitterify(that);
	if(group) { group.add(that); }
	
	return that;
};
exports.task = create_task;

var create_queue = function(name, concurrency) {
	var that = {name: name},
		my = { suspensionCount:0, concurrencyCount: concurrency,
			tasks:[], workerCount:0 };
	emitterify(that);
	
	that.push = function(task, group) {
		if(typeof(task) === 'function') {
			task = create_task(task,group);
		} else if(group) {
			// TODO: add the group to the task
		}
		my.tasks.unshift(task);
		
		my.checkForWork();
	};
	
	that.push_after = function(task, time) {
		// TODO
	};
	
	that.apply_task = function(k, task) {
		// TODO
	};
	
	that.suspend = function() {
		my.suspensionCount++;
	};
	
	that.resume = function() {
		if(my.suspensionCount > 0) {			
			my.suspensionCount--;
		}
		if(my.suspensionCount == 0) {
			my.checkForWork();
		}
	};
	
	my.checkForWork = function() {
		var nextTask;
//		console.log("check for work: " + my.workerCount + " of " + my.concurrencyCount);
		while(my.tasks.length && my.workerCount < my.concurrencyCount &&
			!my.suspensionCount) 
		{
			nextTask = my.tasks.pop();
			
			// setup up task w/ this.done method
			nextTask.done = function() {
				my.taskCompleted(nextTask);
			};
			my.workerCount += 1;
//			console.log("Queuing job on '" + that.name + "' queue.");
			nextTask.method(nextTask);
		}
	};
	
	my.taskCompleted = function(task) {
		my.workerCount -= 1;
//		console.log("Queue '" + that.name + "' completed task.");
		task.emit('completed');

		if(task.group) { task.group.remove(task); }
		
		if(0 === my.workerCount && 0 === my.tasks.length) { that.emit('empty'); }
		else { my.checkForWork(); }
	};
	
	return that;
};
exports.queue = create_queue;
exports.serialQueue = function(name) {
	return create_queue(name, 1);
};