import connect from "../connect"



//searchProduct
export const searchProduct = async (req, res) => {
    try {
        const name = req.query.name;
        const regex = `%${name}%`;

        let sql = `SELECT * FROM products WHERE name ILIKE $1`;
        const result = await connect.query(sql, [regex]);

        return res.json({
            message: "Tìm thấy sản phẩm",
            data: result.rows,
        });
    } catch (error) {
        return res.json({
            message: "Không tìm thấy sản phẩm",
            error,
        });
    }
};

//searchProduct by Category

export const searchProductByCategory = async (req, res) => {
    try {
        const name = req.query.name;
        const regex = `%${name}%`
        let sql = `SELECT p.* FROM products p JOIN categories c ON p.cat_id = c.cat_id WHERE c.name ILIKE $1`;
        const result = await connect.query(sql, [regex]);
        return res.json({
            message: "Tìm thấy sản phẩm trong danh mục ",
            data: result.rows,
        })
    } catch (error) {
        return res.json({
            message: "Không tìm thấy sản phẩm của danh mục bạn đã chọn",
            error,
        });
    }
}


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
        const { is_detete } = req.body
        let sqlPro = `SELECT * FROM products WHERE product_id=${id}`
        connect.query(sqlPro, async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Khong tim thay product", err })
            }
            const product = result.rows[0]
            console.log(product);
            if (is_detete) {
                let sqldelete = `DELETE FROM products WHERE product_id=$1`
                await connect.query(sqldelete, [id]);
            } else {
                let sqldelete = `UPDATE products SET is_deleted = true WHERE product_id = $1`
                await connect.query(sqldelete, [id]);
            }
            return res.status(200).json({
                message: "Xóa sản phẩm thành công",
                product // Trả về thông tin sản phẩm đã xóa (ID)
            });
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
export const RestoreProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const restoreQuery = `UPDATE products SET is_deleted = false WHERE product_id = $1`;
        await connect.query(restoreQuery, [id]);

        return res.status(200).json({
            message: "Phục hồi sản phẩm thành công",
            data: { product_id: id }, // Trả về thông tin sản phẩm đã phục hồi (ID)
        });
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}

//getone
export const GetOneProduct = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        let sql = `SELECT * FROM products WHERE product_id=${id} `
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Lay 1 san pham that bai', err })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'Lay 1 san pham thanh cong', data })
        })
    } catch (errr) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
//getall
export const GetAllProduct = (req, res) => {
    try {
        const { _sort = "createAt", _order = "asc", _limit = 3, _page = 1 } = req.query;
        const offset = (_page - 1) * _limit;
        let sqlQuery = `SELECT * FROM products ORDER BY ${_sort} ${_order === "desc" ? "DESC" : "ASC"} LIMIT ${_limit} OFFSET ${offset};`;
        connect.query(sqlQuery, (err, result) => {
            if (err) {
                return res.json({
                    message: "Không lấy được danh sách sản phẩm"
                })
            }
            const data = result.rows
            return res.json({
                message: "Danh sách sản phẩm",
                data
            })
        })
    } catch (error) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
//http://localhost:8080/api/products?_sort=price&_page=3&_order=desc&_limit=5 truy van dang nhu nay


//update
export const UpdateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { name, price, quantity, color, image, description, cat_id } = req.body
        let sql = `UPDATE products SET name='${name}', price=${price}, quantity=${quantity}, color = '${color}', image='${image}', description='${description}', cat_id = ${cat_id} WHERE product_id=${id} RETURNING *`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Update product that bai', err })
            }
            const data = results.rows[0]
            return res.status(200).json({ message: 'Update product thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
