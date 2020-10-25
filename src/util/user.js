class User {
    id
    name
    iconColor

    constructor(id, name, iconColor) {
        this.id = id
        this.name = name
        this.iconColor = "#" + iconColor
    }
}

export {
    User
}