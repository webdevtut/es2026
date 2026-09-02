export type RenderHook = "before" | "after" | "update" | "destroy";

const hookMethodMap: Record<RenderHook, string> = {
    before: "beforeRender",
    after: "afterRender",
    update: "updateRender",
    destroy: "destroyRender",
};

export function OnRender(
    hook: RenderHook = "after",
    options?: { silent?: boolean }
): MethodDecorator {
    return (
        _target: object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const original = descriptor.value;
        const methodName = String(propertyKey);

        descriptor.value = function (...args: unknown[]) {
            const instance = this as any;
            const lifecycleName = hookMethodMap[hook];

            try {
                if (hook === "before" && typeof instance[lifecycleName] === "function") {
                    instance[lifecycleName](...args);
                }

                const result = original.apply(this, args);

                if (hook === "after" && typeof instance[lifecycleName] === "function") {
                    instance[lifecycleName](result, ...args);
                }

                if (hook === "update" && typeof instance[lifecycleName] === "function") {
                    instance[lifecycleName](result, ...args);
                }

                return result;
            } catch (error) {
                if (typeof instance.renderError === "function") {
                    instance.renderError(error, methodName, ...args);
                }

                if (!options?.silent) {
                    console.error(`Render hook failed: ${methodName}`, error);
                }

                throw error;
            } finally {
                if (hook === "destroy" && typeof instance[lifecycleName] === "function") {
                    instance[lifecycleName]();
                }
            }
        };

        return descriptor;
    };
}
