interface User {
    id: number
    name: string
}

let users: User[] = [
    {id: 1, name: "Alice"},
    {id: 2, name: "Bob"}
]

let names = users.map((user) => user.name)
console.log(names)