/*
Memoization and currying

Memoization keeps results in a closure so repeated calls with the same
arguments can reuse the result. Currying converts a function that accepts
multiple arguments into one that accepts them in successive calls.

This example uses JSON-serialized argument lists as cache keys, which is
convenient for simple JSON-compatible inputs. For objects, circular values,
BigInts, or values with custom serialization, choose a cache-key strategy
suited to the function instead.
*/

function memoize(fn) {
   const cache = new Map();

   return function (...args) {
      const key = JSON.stringify(args);

      if (cache.has(key)) {
         return cache.get(key);
      }

      const result = fn(...args);
      cache.set(key, result);
      return result;
   };
}

let fibonacciCalls = 0;
let fibonacci;
fibonacci = memoize(function calculateFibonacci(n) {
   fibonacciCalls += 1;

   if (n <= 1) {
      return n;
   }

   // Recurse through the memoized function so each subproblem is cached.
   return fibonacci(n - 1) + fibonacci(n - 2);
});

function curry(fn) {
   function curried(...args) {
      if (args.length >= fn.length) {
         return fn(...args);
      }

      return (...nextArgs) => curried(...args, ...nextArgs);
   }

   return curried;
}

function sum(a, b, c) {
   return a + b + c;
}

const curriedSum = curry(sum);

if (typeof module === "undefined" || require.main === module) {
   console.log("Memoized Fibonacci(40):", fibonacci(40));
   console.log("Fibonacci calculations:", fibonacciCalls);
   console.log("Cached Fibonacci(40):", fibonacci(40));
   console.log("Calculations after cached call:", fibonacciCalls);

   console.log("Curried one at a time:", curriedSum(1)(2)(3));
   console.log("Curried in groups:", curriedSum(1, 2)(3));
   console.log("Curried with partial application:", curriedSum(1)(2, 3));
}

if (typeof module !== "undefined" && module.exports) {
   module.exports = { curry, memoize };
}
