export type ComponentMetadata = {
    selector?: string;
    template?: string;
    styles?: string[];
    providers?: unknown[];
    route?: string;
};

export type ComponentRenderContext<TState extends Record<string, unknown> = Record<string, unknown>> = {
    host: HTMLElement;
    state: TState;
    element: HTMLElement;
    update: () => void;
    destroy: () => void;
};

export type ComponentFactoryDefinition<TState extends Record<string, unknown> = Record<string, unknown>> = {
    metadata?: ComponentMetadata;
    state?: TState;
    render: (context: ComponentRenderContext<TState>) => string;
    onInit?: (context: ComponentRenderContext<TState>) => void;
    onRender?: (context: ComponentRenderContext<TState>) => void;
    onDestroy?: (context: ComponentRenderContext<TState>) => void;
};

const componentRegistry = new Map<string, any>();

export function Component(metadata: ComponentMetadata = {}) {
    return function <T extends new (...args: any[]) => any>(target: T) {
        Object.defineProperty(target, "ɵcomponent", {
            value: metadata,
            writable: false,
            configurable: false,
        });

        const selector = metadata.selector ?? target.name;
        componentRegistry.set(selector, target);
        componentRegistry.set(target.name, target);

        if (metadata.route) {
            componentRegistry.set(metadata.route, target);
        }

        return target;
    };
}

export function createComponentFactory<TState extends Record<string, unknown> = Record<string, unknown>>(
    definition: ComponentFactoryDefinition<TState>
) {
    return function mount(host: HTMLElement, initialState: Partial<TState> = {} as Partial<TState>) {
        const state = {
            ...(definition.state ?? ({} as TState)),
            ...initialState,
        } as TState;

        const element = document.createElement("section");
        element.className = "component-zone-item";

        const style = document.createElement("style");
        if (definition.metadata?.styles?.length) {
            style.textContent = definition.metadata.styles.join("\n");
            document.head.appendChild(style);
        }

        const ctx = {
            host,
            state,
            element,
            update: () => undefined,
            destroy: () => undefined,
        } satisfies ComponentRenderContext<TState>;

        ctx.update = () => {
            element.innerHTML = definition.render(ctx);
            definition.onRender?.(ctx);
        };

        ctx.destroy = () => {
            definition.onDestroy?.(ctx);
            element.remove();
            style.remove();
        };

        definition.onInit?.(ctx);
        host.appendChild(element);
        ctx.update();

        return ctx;
    };
}

export function getRegisteredComponent(name: string) {
    return componentRegistry.get(name);
}

export function getComponentMetadata(target: any) {
    return target?.ɵcomponent as ComponentMetadata | undefined;
}
