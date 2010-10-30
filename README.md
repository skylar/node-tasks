Queue-based execution and eventing for tasks on node.js

Inspired by Apple's GCD (Grand Central Dispatch), this Common JS module control execution of asynchronous tasks which may compete for access to finite resources (eg, file handles, network connections, external APIs). Also, perhaps an easy way to register event handlers for completion of multiple blocked tasks.

See examples.js for more.