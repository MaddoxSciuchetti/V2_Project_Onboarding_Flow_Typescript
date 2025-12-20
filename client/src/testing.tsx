function getFirstElement<ElementType>(array: ElementType[]) {
    return array[0]
}

const numbers = [1,2,3]
const firstNum = getFirstElement(numbers)

const strings = ["sdf", "sdf"]
const firstString = getFirstElement