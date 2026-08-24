// Base prototype object (Animal)
const AnimalPrototype = {
  speak() {
    console.log(`${this.name} makes a sound.`);
  },
  move() {
    console.log(`${this.name} moves.`);
  }
};

// Factory function to create an animal object
function createAnimal(name, type) {
  let animal = Object.create(AnimalPrototype);
  animal.name = name;
  animal.type = type;
  return animal;
}

// Proxy handler for logging access and modifications
const proxyHandler = {
  get(target, prop) {
    console.log(`\x1b[36m👀 Accessed property: ${prop}\x1b[0m`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Set property: ${prop} to value: ${value}`);
    target[prop] = value;
    return true;
  }
};

// Function to apply a Proxy to an object
function createProxy(obj) {
  return new Proxy(obj, proxyHandler);
}

// Deep copy with Proxy function, ensuring the prototype is preserved
function deepCopyWithProxy(obj) {
  // If it's a primitive value, return it
  if (obj === null || typeof obj !== 'object') return obj;

  // Create a new object or array for deep copy
  let copy = Array.isArray(obj) ? [] : {};

  // Copy the prototype chain
  Object.setPrototypeOf(copy, Object.getPrototypeOf(obj));

  // Recursively copy properties and methods
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopyWithProxy(obj[key]);
    }
  }

  // Return a Proxy for the copied object
  return createProxy(copy);
}

// Create a new Animal and wrap it in a Proxy
const dog = createAnimal("Buddy", "Dog");
const dogProxy = createProxy(dog);

// Use the Proxy (intercepted behavior)
dogProxy.speak(); // Logs: Accessed property: speak
dogProxy.name = "Charlie"; // Logs: Set property: name to value: Charlie

// Deep copy the dog object
const dogCopy = deepCopyWithProxy(dogProxy);
dogCopy.speak(); // Logs: Accessed property: speak
dogCopy.name = "Max"; // Logs: Set property: name to value: Max

// Check if the original dog object is unchanged
console.log(dog.name); // Logs: Buddy
console.log(dogCopy.name); // Logs: Buddy
