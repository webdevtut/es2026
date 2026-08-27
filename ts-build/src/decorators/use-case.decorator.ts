export function UseCase(name: string): MethodDecorator {
    return (
        _target: object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const original = descriptor.value;
        const methodName = String(propertyKey);
        const timerLabel = `Use Case → ${name} | ${methodName}`;

        descriptor.value = function (...args: unknown[]) {
            console.log(`Use Case: ${name}`);
            console.log(`Method: ${methodName}`);

            console.time();

            try {
                return original.apply(this, args);
            } finally {
                console.timeEnd(timerLabel);
            }
        };

        return descriptor;
    };
}