#!/usr/bin/env node

if (process.argv.length > 2) {
  for (var i = 2; i < process.argv.length; i++) {
    console.log(process.argv[i]);
  }
} else {
  console.log("Hello World");
}
