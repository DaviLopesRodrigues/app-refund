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
            const { ok, status, statusText } = response;
            if (!ok) {
                throw new Error(`Erro ao criar item (${statusText} ${status})`);
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    static async fetchRefunds() {
        try {
            const response = await fetch("http://localhost:3333/refunds")
            const { ok, status, statusText } = response;
            if (!ok) {
                throw new Error(`Erro ao listar items (${statusText} ${status})`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteRefund(id) {
        try {
            const response = await fetch(`http://localhost:3333/refunds/${id}`, {
                method: "DELETE"
            })

            const { ok, status, statusText } = response;
            if (!ok) {
                throw new Error(`Erro ao deletar item (${statusText} ${status})`);
            }
            return response;
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}

export { Refund };