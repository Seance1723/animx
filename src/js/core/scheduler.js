// scheduler.js
let readTasks = [];
let writeTasks = [];
let frameTasks = [];
let scheduled = false;
let frameId = null;

function flushTasks() {
  const reads = readTasks;
  const writes = writeTasks;
  const frames = frameTasks;

  readTasks = [];
  writeTasks = [];
  frameTasks = [];

  reads.forEach(t => t());
  writes.forEach(t => t());
  frames.forEach(t => t());

  scheduled = false;
}

export const scheduler = {
  read(fn) {
    readTasks.push(fn);
    this.schedule();
  },
  write(fn) {
    writeTasks.push(fn);
    this.schedule();
  },
  frame(fn) {
    frameTasks.push(fn);
    this.schedule();
  },
  schedule() {
    if (!scheduled) {
      scheduled = true;
      frameId = requestAnimationFrame(flushTasks);
    }
  },
  cancel(id) {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
      scheduled = false;
      readTasks = [];
      writeTasks = [];
      frameTasks = [];
    }
  },
  flush() {
    flushTasks();
  }
};
