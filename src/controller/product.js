import connect from "../connect"


export const AddProduct = async (req, res) => {
    try {
        const { name, price, quantity, description, color, image, cat_id } = req.body
        let sql = `INSERT INTO products(name, price, quantity, description, color, image, cat_id)
        VALUES('${name}', '${price}', '${quantity}', '${description}', '${color}', '${image}', '${cat_id}') RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) return res.status(500).json({ message: 'Them that bai' })
            const data = result.rows[0]
            return res.status(200).json({ message: 'Them thanh cong product', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
