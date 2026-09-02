import { getRegisteredComponent } from "../decorators/component.decorator";

export type BootstrapRoute = "demo" | "secondary" | string;

export function renderComponent(componentCtor: any, host: HTMLElement) {
    const metadata = componentCtor?.ɵcomponent;

    if (!metadata) {
        throw new Error("Not a component");
    }

    const instance = new componentCtor();

    if (metadata.styles?.length) {
        const style = document.createElement("style");
        style.textContent = metadata.styles.join("\n");
        document.head.appendChild(style);
    }

    if (metadata.template) {
        const wrapper = document.createElement("section");
        wrapper.className = "component-zone-item";
        wrapper.innerHTML = metadata.template;
        host.appendChild(wrapper);
    }

    if (typeof instance.render === "function") {
        instance.render();
    }

    return instance;
}

export function bootstrapRoute(route: BootstrapRoute, host: HTMLElement) {
    const componentCtor = getRegisteredComponent(route) ?? getRegisteredComponent("DemoComponent");

    if (!componentCtor) {
        console.warn(`No component registered for route: ${route}`);
        return;
    }

    renderComponent(componentCtor, host);
}
