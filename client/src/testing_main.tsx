interface Person {
    name: string| number | string[]; 
    surname: string;
}


const unpredictableFunction = (): string|number|string[] => {
    return Math.random() > 0.5? "string": Math.random() > 0.5 ? 9999 : ["1","2", "3"]
}

const person: Person = {name: "", surname: ""};
person.name = unpredictableFunction();