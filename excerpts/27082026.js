// snippets new better way Reliable Type Detection nativeJS

// alternate to typeof as everything almost returns object
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

getType([]);

//'Array'

// object.freeze alternative as it freezes everything

function readonly(object) {
  return new Proxy(object, {
    set(_, property) {
      throw new Error(`${String(property)} is read-only`);
    },

    deleteProperty(_, property) {
      throw new Error(`${String(property)} cannot be deleted`);
    },
  });
}

const config = readonly({
  api: "/v1",
});

config.api = "/v2";
// gives error and can be exposed