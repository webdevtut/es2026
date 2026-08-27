import {
    debounceTime,
    distinctUntilKeyChanged,
    fromEvent,
    map,
    Observable,
    tap
} from "rxjs";

import { toKebabCase } from "../utils/string.util";
import { StringTransformResult } from "../types/string-transform.type";

export function processString(input: HTMLInputElement): Observable<StringTransformResult> {

    const timerLabel = "RxJS Pipeline → String Transformation";
    
    return fromEvent(input, "keyup").pipe(

        tap(() => {
            console.log("RxJS Pipeline → Processing Started");
            console.time();
            console.log("Debounced Input processing");
        }),
        
        debounceTime(500),
        
        map(() => ({
            original: input.value.trim(),
            converted: toKebabCase(input.value.trim())
            
        })),
        tap(() => {
            console.timeEnd(timerLabel);
            console.log("RxJS String Processing End for one change detected");
            console.log("input value", input.value)
        }),
        
        distinctUntilKeyChanged("converted")

    );

}