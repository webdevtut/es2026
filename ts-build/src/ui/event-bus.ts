import { Calculator } from "../services/calculator.service";
import { DEFAULT_INPUT_VALUE } from "../constants/ui.constants";
import { StringTransformResult } from "../types/string-transform.type";

const calculator = new Calculator();

const result = document.getElementById("result")!;
const input = document.getElementById("pascalInput") as HTMLInputElement;
const container = document.getElementById("stringContainer")!;

input.placeholder = DEFAULT_INPUT_VALUE;
input.value = DEFAULT_INPUT_VALUE;

calculator.observeInput(input).subscribe((data: StringTransformResult) => {

    result.innerHTML = `
        <strong>Original</strong>
        <br>
        ${data.original}

        <br><br>

        <strong>Converted</strong>
        <br>
        ${data.converted}
    `;

});

document
    .querySelectorAll<HTMLInputElement>('input[name="usecase"]')
    .forEach(radio => {

        radio.addEventListener("change", () => {

            const selected = (
                document.querySelector(
                    'input[name="usecase"]:checked'
                ) as HTMLInputElement
            ).value;

            container.style.display =
                selected === "kebab"
                    ? "block"
                    : "none";

        });

    });

document
    .getElementById("runBtn")!
    .addEventListener("click", () => {

        const selected = (
            document.querySelector(
                'input[name="usecase"]:checked'
            ) as HTMLInputElement
        ).value;

        if (selected !== "addition") {
            return;
        }

        const first = Number(prompt("Enter first number"));
        const second = Number(prompt("Enter second number"));

        result.innerHTML = `
            <strong>Result</strong><br>
            ${calculator.add(first, second)}
        `;

    });