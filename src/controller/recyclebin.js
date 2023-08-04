import connect from "../connect"

//restore
export const RestoreProduct = async (req, res) => {
    try {
        const id = req.params.id
        let sql = `SELECT * FROM recyclebin WHERE id = '${id}'`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Khong tim thay san pham da xoa trong thung rac", err })
            }
            const recyclebin = result.rows[0]
            const product = recyclebin.product
            let sqlrestore = `INSERT INTO products (product_id, name,price,quantity,description,color,image,cat_id) VALUES (${product.product_id}, '${product.name}', ${product.price}, ${product.quantity}, '${product.description}',' ${product.color}', '${product.image}', ${product.cat_id})  RETURNING *`
            connect.query(sqlrestore, async (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Khong khoi phuc duoc san pham", err })
                }
                const product = result.rows[0]
                let slqremoveProduct = `DELETE FROM recyclebin WHERE id= ${id}`
                connect.query(slqremoveProduct, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Xoa recyclebin that bai", err })
                    }
                    return res.status(200).json({ message: "Khoi phuc thanh cong product", product })
                })

            })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi API', err })
    }
}