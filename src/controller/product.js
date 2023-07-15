import connect from "../connect"

//add
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

//remove
export const RemoveProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        console.log(id);
        let sql = `DELETE from products WHERE product_id =${id} RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Xoa that bai', err })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'Xoa thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}

//getone
export const GetOneProduct = async (req, res) => {
    try {
        const id  = req.params.id
        console.log(id);
        let sql = `SELECT * FROM products WHERE product_id=${id} `
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Lay 1 san pham that bai',err })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'Lay 1 san pham thanh cong',data })
        })
    } catch (errr) {
        return res.status(500).json({ message: 'Loi api' })
    }
}