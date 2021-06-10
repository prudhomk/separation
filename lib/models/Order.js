const pool = require('pool');

// 1. define the shape of our data
// 2. define methods to access that data (CRUD)
class Order {
  id;
  quantityOfItems;

  constructor(row) {
    this.id = row.id;
    this.quantityOfItems = row.quantity_of_items;
  }

  // static method
  // instance method
  static async insert(quantity) {
    const { rows } = await pool.query(
      `INSERT INTO orders (quantity_of_items) 
       VALUES ($1) 
       RETURNING *`,
      [quantity]
    );

    return new Order(rows[0]);
  }


  static async select() {
    const { rows } = await pool.query(
      `SELECT *
       FROM orders  
       `);

    return new Order(rows);
  }


  static async selectId(id) {
    const { rows } = await pool.query(
      `SELECT id, quantity
       FROM orders 
       WHERE id = $1 
       `, [id]);

    return new Order(rows[0] || null);
  }

  static async update(quantityOfItems, id) {
    const { rows } = await pool.query(
      `UPDATE orders 
        SET  quantity_of_items = $1 
        WHERE id = $2 
        RETURNING *
      `,
      [quantityOfItems, id]
    );


    return new Order(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM orders 
        WHERE id = $1 
        RETURNING *
      `,
      [id]
    );

    
    return new Order(rows[0]);
  }


}

module.exports = Order;
