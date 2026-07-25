import { Observable } from "rxjs";
import { UseCase } from "../decorators/use-case.decorator";
import { processString } from "../rxjs/string.processor";
import { StringTransformResult } from "../types/string-transform.type";

export class Calculator {

    @UseCase("Addition")
    add(a: number, b: number) {
        return a + b;
    }
    

    @UseCase("RxJS Input Pipeline Initialized 🚀")
    observeInput(input: HTMLInputElement): Observable<StringTransformResult> {
        return processString(input);
    }

}