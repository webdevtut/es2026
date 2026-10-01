/*
ECMAScript 2026 JavaScript API summary (2026-10-01)

1. Map.prototype.getOrInsert(key, defaultValue) returns the existing value for
   key, or stores and returns defaultValue when the key is absent.
   Map.prototype.getOrInsertComputed(key, callback) does the same but calls
   callback only when needed, which avoids needless creation of arrays, objects,
   or other expensive defaults. Useful for grouping and counters instead of a
   repeated Map.has()/set()/get() sequence.

2. Array.fromAsync(source, mapFn?) collects an async iterable, iterable, or
   array-like source into an array, optionally transforming each item. It
   awaits mapped values as it processes the sequence, so it is not a concurrent
   replacement for Promise.all(source.map(...)); use Promise.all() for
   independent work that should run concurrently, or for-await...of to process
   a large stream incrementally without retaining every value.

3. Iterator.concat(...sources) lazily concatenates synchronous iterables in
   order without first copying them into a new array. It is useful when sources
   are large or lazy; it does not concatenate async iterators.

4. JSON.parse(text, reviver) now passes a third context argument to the reviver
   for primitive values. context.source contains the original JSON token, so
   large integer digits can be converted with BigInt(context.source) before
   precision is lost to Number. JSON.rawJSON(text) can be returned by a
   JSON.stringify() replacer to emit validated raw JSON, for example a BigInt
   decimal representation as an unquoted JSON number. BigInt itself is not
   directly serializable by JSON.stringify().

5. Uint8Array adds direct binary encodings: bytes.toBase64(options) encodes to
   Base64 (options can select the base64url alphabet and omit padding);
   Uint8Array.fromBase64(text, options) decodes Base64; bytes.toHex() encodes
   hexadecimal; Uint8Array.fromHex(text) decodes hexadecimal; and
   buffer.setFromBase64(text, options) writes decoded bytes into an existing
   buffer and reports read/written counts. Use TextEncoder/TextDecoder for
   converting text to and from bytes; these Uint8Array APIs handle Base64/hex.

6. Error.isError(value) checks whether a value is an actual Error object,
   including errors created in another realm such as an iframe, where
   value instanceof Error can fail. It also supports safely normalizing values
   caught from code that may throw non-Error values.

7. Math.sumPrecise(iterable) computes a more reliable floating-point sum,
   reducing accumulation error for values with very different magnitudes. It
   accepts any iterable, not just arrays. It does not provide exact decimal
   arithmetic: inputs such as 0.1 and 0.2 are still binary floating-point
   approximations, so financial calculations may need decimal arithmetic or
   integer minor units.

Check browser and runtime support before relying on these APIs in production.
*/

async function* issueStream() {
   yield { title: "First issue" };
   yield { title: "Second issue" };
}

async function runExamples() {
   // Map defaults and lazy grouping
   if (typeof Map.prototype.getOrInsert === "function" &&
         typeof Map.prototype.getOrInsertComputed === "function") {
      const preferences = new Map();
      const theme = preferences.getOrInsert("theme", "system");
      console.log("Map default:", theme);

      const wordsByLength = new Map();
      for (const word of ["cat", "house", "dog", "window"]) {
         wordsByLength
            .getOrInsertComputed(word.length, () => [])
            .push(word);
      }
      console.log("Words of length 3:", wordsByLength.get(3));
   }

   // Collect an async sequence; use Promise.all for concurrent work instead.
   if (typeof Array.fromAsync === "function") {
      const titles = await Array.fromAsync(issueStream(), (issue) => issue.title);
      console.log("Async iterator titles:", titles);
   }
   const responses = await Promise.all(
      ["/api/one", "/api/two"].map(async (url) => ({ url, ok: true })),
   );
   console.log("Concurrent results:", responses);

   // Lazily concatenate synchronous route collections.
   if (typeof Iterator !== "undefined" &&
         typeof Iterator.concat === "function") {
      const routes = Iterator.concat(
         ["/", "/about"],
         ["/admin", "/admin/users"],
         ["*"],
      );
      console.log("Routes:", Array.from(routes));
   }

   // Preserve a large JSON integer through parsing and serialization.
   if (typeof JSON.rawJSON === "function" && typeof BigInt === "function") {
      const payload = '{"messageId":1183028002140618753,"channel":"general"}';
      let hasSource = false;
      const message = JSON.parse(payload, (key, value, context) => {
         if (key === "messageId" && context?.source !== undefined) {
            hasSource = true;
            return BigInt(context.source);
         }
         return value;
      });
      if (hasSource) {
         const json = JSON.stringify(message, (key, value) =>
            typeof value === "bigint" ? JSON.rawJSON(value.toString()) : value,
         );
         console.log("Large integer JSON:", json);
      }
   }

   // Direct Base64URL and hexadecimal conversions.
   if (typeof Uint8Array.prototype.toBase64 === "function" &&
         typeof Uint8Array.fromBase64 === "function") {
      const bytes = new Uint8Array([72, 101, 108, 108, 111]);
      const token = bytes.toBase64({ alphabet: "base64url", omitPadding: true });
      const decoded = Uint8Array.fromBase64(token, { alphabet: "base64url" });
      console.log("Base64URL round-trip:", token, decoded);
   }
   if (typeof Uint8Array.prototype.toHex === "function" &&
         typeof Uint8Array.fromHex === "function") {
      const hello = new Uint8Array([72, 101, 108, 108, 111]);
      const hex = hello.toHex();
      const restored = Uint8Array.fromHex(hex);
      console.log("Hex round-trip:", hex, restored);
   }
   if (typeof Uint8Array.prototype.setFromBase64 === "function") {
      const buffer = new Uint8Array(64);
      const { read, written } = buffer.setFromBase64("SGVsbG8=");
      console.log("Decoded into buffer:", { read, written });
   }

   // Normalize an unknown thrown value, including non-Error throws.
   if (typeof Error.isError === "function") {
      try {
         throw { message: "Plugin failed" };
      } catch (value) {
         const error = Error.isError(value)
            ? value
            : new Error(String(value), { cause: value });
         console.log("Normalized error:", error.message);
      }
   }

   // More robust accumulation with values of very different magnitudes.
   if (typeof Math.sumPrecise === "function") {
      const readings = [1e16, 3.5, -1e16];
      console.log("Ordinary sum:", readings.reduce((sum, value) => sum + value, 0));
      console.log("Precise sum:", Math.sumPrecise(readings));
      console.log("Precise iterable sum:", Math.sumPrecise(new Set(readings)));
   }
}

runExamples().catch((error) => console.error("Example failed:", error));

/*
Sample output from the current Node.js runtime; feature-gated lines may vary.

Map default: system
Words of length 3: [ 'cat', 'dog' ]
Async iterator titles: [ 'First issue', 'Second issue' ]
Concurrent results: [ { url: '/api/one', ok: true }, { url: '/api/two', ok: true } ]
Routes: [ '/', '/about', '/admin', '/admin/users', '*' ]
Large integer JSON: {"messageId":1183028002140618753,"channel":"general"}
Base64URL round-trip: SGVsbG8 Uint8Array(5) [ 72, 101, 108, 108, 111 ]
Hex round-trip: 48656c6c6f Uint8Array(5) [ 72, 101, 108, 108, 111 ]
Decoded into buffer: { read: 8, written: 5 }
Normalized error: [object Object]

Math.sumPrecise output appears only when the runtime implements that API.
*/