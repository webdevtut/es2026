import { Calculator } from "../services/calculator.service";
import { DEFAULT_INPUT_VALUE, DEFAULT_INPUT_VALUE1 } from "../constants/ui.constants";
import { StringTransformResult } from "../types/string-transform.type";

const calculator = new Calculator();

const result = document.getElementById("result")!;
const input = document.getElementById("pascalInput") as HTMLInputElement;
const result1 = document.getElementById("result1")!;
const input1 = document.getElementById("pascalInput1") as HTMLInputElement;
const containers = document.querySelectorAll<HTMLElement>("#stringContainer")!;

input.placeholder = DEFAULT_INPUT_VALUE;
input.value = DEFAULT_INPUT_VALUE;
input1.placeholder = DEFAULT_INPUT_VALUE1;
input1.value = DEFAULT_INPUT_VALUE1;

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

calculator.observeInput(input1).subscribe((data: StringTransformResult) => {

    result1.innerHTML = `
        <strong>Original1</strong>
        <br>
        ${data.original}

        <br><br>

        <strong>Converted1</strong>
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

           containers.forEach(container => {
                container.style.display =
                    selected === "kebab" ? "block" : "none";
            });

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