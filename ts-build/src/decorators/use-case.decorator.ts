export function UseCase(name: string): MethodDecorator {
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