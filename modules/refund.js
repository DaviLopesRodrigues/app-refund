class Refund {
    constructor(name, category, amount) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.category = category;
        this.amount = amount;
    }
}

export { Refund };