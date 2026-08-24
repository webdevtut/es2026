const letters: any = ["a", "b", "c", "d", "e"];
const numbers = [1, 2, 3];

const padding = ["[Letter missing]", "[Number missing]"];
const it: any = Iterator.zip([letters, numbers], { mode: "longest", padding });
for (const [letter, number] of it) {
    console.log(`${letter}: ${number}`);
}