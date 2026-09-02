import {
    Component,
    createComponentFactory,
} from "../decorators/component.decorator";
import { OnRender } from "../decorators/render.decorator";

export const DemoComponentFactory = createComponentFactory({
    metadata: {
        selector: "demo",
        route: "demo",
        styles: [
            `

            `,
        ],
    },
    state: {
        title: "Demo Component",
        description: "This page is mounted by the closure factory system.",
    },
    render: ({ state, element }) => `
        <section class="demo-shell">
            <h2>${state.title}</h2>
            <p>${state.description}</p>
            <button id="demo-button">Run Demo</button>
        </section>
    `,
    onRender: ({ element }) => {
        const button = element.querySelector("#demo-button");
        button?.addEventListener("click", () => {
            console.log("Demo button clicked");
        });
    },
});

@Component({
    selector: "demo",
    route: "demo",
    template: `
        <section class="demo-shell">
            <h2>Demo Component</h2>
            <p>This page is mounted by the component decorator system.</p>
            <button id="demo-button">Run Demo</button>
        </section>
    `,
    styles: [
        `
            .demo-shell {
                padding: 20px;
                border: 1px solid #d0d7de;
                border-radius: 8px;
                max-width: 420px;
                margin: 20px auto;
                background: #f6f8fa;
            }
        `
    ]
})
export class DemoComponent {
    beforeRender() {
        console.log("Demo before render");
    }

    afterRender() {
        console.log("Demo after render");
        const button = document.getElementById("demo-button");
        button?.addEventListener("click", () => {
            console.log("Demo button clicked");
        });
    }

    @OnRender("after")
    render() {
        const host = document.getElementById("app");
        if (!host) {
            return;
        }

        host.innerHTML = `
            <section class="demo-shell">
                <h2>Demo Component</h2>
                <p>This page is mounted by the component decorator system.</p>
                <button id="demo-button">Run Demo</button>
            </section>
        `;
    }
}
