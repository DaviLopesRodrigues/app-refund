class Refund {
    constructor(name, category, amount) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.category = category;
        this.amount = amount;
    }

    static async createRefund(propsRefund) {
        try {
            const response = await fetch("http://localhost:3333/refunds", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(propsRefund)
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.log("Erro ao criar item:", error)
        }
    }

    static async fetchRefunds() {
        const response = await fetch("http://localhost:3333/refunds").then((res) => res.json());
        return response;
    }
}

export { Refund };