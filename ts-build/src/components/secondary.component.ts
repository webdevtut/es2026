import {
    Component,
    createComponentFactory,
} from "../decorators/component.decorator";
import { OnRender } from "../decorators/render.decorator";

export const SecondaryComponentFactory = createComponentFactory({
    metadata: {
        selector: "secondary",
        route: "secondary",
        styles: [
            `
                .secondary-shell {
                    padding: 20px;
                    border: 1px solid #b6e3ff;
                    border-radius: 8px;
                    max-width: 420px;
                    margin: 20px auto;
                    background: #eef9ff;
                }
            `,
        ],
    },
    state: {
        title: "Secondary Component",
        description: "This page is mounted from the closure factory route.",
    },
    render: ({ state, element }) => `
        <section class="secondary-shell">
            <h2>${state.title}</h2>
            <p>${state.description}</p>
            <button id="secondary-button">Open Details</button>
        </section>
    `,
    onRender: ({ element }) => {
        const button = element.querySelector("#secondary-button");
        button?.addEventListener("click", () => {
            alert("Secondary component action triggered");
        });
    },
});

@Component({
    selector: "secondary",
    route: "secondary",
    template: `
        <section class="secondary-shell">
            <h2>Secondary Component</h2>
            <p>This page is mounted from the secondary route.</p>
            <button id="secondary-button">Open Details</button>
        </section>
    `,
    styles: [
        `
            .secondary-shell {
                padding: 20px;
                border: 1px solid #b6e3ff;
                border-radius: 8px;
                max-width: 420px;
                margin: 20px auto;
                background: #eef9ff;
            }
        `
    ]
})
export class SecondaryComponent {
    @OnRender("after")
    render() {
        const button = document.getElementById("secondary-button");
        button?.addEventListener("click", () => {
            alert("Secondary component action triggered");
        });
    }
}
