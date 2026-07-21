function UseCase(name: string): MethodDecorator {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {

        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`Use Case: ${name}`);
            console.log(`Method: ${String(propertyKey)}`);

            return original.apply(this, args);
        };

        return descriptor;
    };
}

class Calculator {

    @UseCase("Addition")
    add(a: number, b: number) {
        return a + b;
    }
}

const calculator = new Calculator();

const first = Number(prompt("Enter first number"));
const second = Number(prompt("Enter second number"));

const result = calculator.add(first, second);

document.getElementById("title")!.textContent =
    "Method Decorator Demo";

document.getElementById("result")!.textContent =
    `${first} + ${second} = ${result}`;