const { nanoid } = require("nanoid")

export const categoryData = {
    _: "All",
    cloth: "Clothes",
    laptop: "Laptops",
    electronic: "Electronic",
    furniture: "Furniture",
    mobile: "Mobile phones and tablets",
    sprot: "Sports, arts & outdoors",
    book: "Books",
    Property: "Property"
}

export const productData = [
    {
        _id: nanoid(),
        image: "",
        name: "Plain polo",
        description: "This is a plain polo shirt",
        price: 9000,
        phone: "09038043846",
        category: "cloth",
    },
    {
        _id: nanoid(),
        image: "",
        name: "Plain polo",
        description: "This is a plain polo shirt",
        price: 9000,
        phone: "09038043846",
        category: "cloth",
    },
    {
        _id: nanoid(),
        image: "",
        name: "Plain polo",
        description: "This is a plain polo shirt",
        price: 9000,
        phone: "09038043846",
        category: "book",
    }
]