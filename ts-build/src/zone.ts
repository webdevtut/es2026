import { DemoComponentFactory } from "./components/demo.component";
import { SecondaryComponentFactory } from "./components/secondary.component";

const factories = {
    demo: DemoComponentFactory,
    secondary: SecondaryComponentFactory,
};

type Route = keyof typeof factories;

export function initZone(): void {
    const zone = document.getElementById("zone");

    if (!zone) {
        console.warn('Zone element not found.');
        return;
    }

    zone.innerHTML = "";

    const explicitRoute = document.body.dataset.page;

    if (explicitRoute) {
        const factory = factories[explicitRoute as Route];

        if (!factory) {
            console.warn(`Unknown route: ${explicitRoute}`);
            return;
        }

        factory(zone);
        return;
    }

    // No explicit route → mount everything
    Object.values(factories).forEach(factory => {
        factory(zone);
    });
}