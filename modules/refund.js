class Refund {
  constructor(name, category, amount) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.category = category;
    this.amount = amount;
  }

  static async createRefund(propsRefund) {
    try {
      await axios.post("http://localhost:3333/refunds", propsRefund);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async fetchRefunds() {
    try {
      const response = await axios.get("http://localhost:3333/refunds");
      const { data } = response;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteRefund(id) {
    try {
      await axios.delete(`http://localhost:3333/refunds/${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { Refund };
