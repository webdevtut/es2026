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
    
    return fromEvent(input, "keyup").pipe(
        
        debounceTime(500),
        
        map(() => ({
            original: input.value.trim(),
            converted: toKebabCase(input.value.trim())
            
        })),
        tap(() => console.log("input value", input.value)),
        
        distinctUntilKeyChanged("converted")

    );

}