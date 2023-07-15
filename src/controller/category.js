import connect from "../connect";

//add
export const AddCategory = async (req, res, next) => {
    try {
        const { name, image } = req.body;
        let sql = `INSERT INTO categories(name, image)
        VALUES('${name}', '${image}') RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Them that bai' })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'Them thanh cong category', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
//getall
export const GetALlCategory = async (req, res) => {
    try {
        let sql = `SELECT * FROM categories`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay tat ca category that bai' })
            }
            const data = results.rows
            return res.status(200).json({ message: 'Lay tat ca category thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
//getOne
export const getOneCategory = (req, res) => {
    try {
        const id = req.params.id;
        let sql = `SELECT * FROM categories WHERE cat_id=${id}`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.json({
                    message: "Lấy 1 danh mục thất bại"
                })
            }
            const data = result.rows[0]
            return res.json({
                message: "Lấy 1 danh mục thành công",
                data
            })
        })
    } catch (error) {
        return res.status(500).json({ message: 'Loi api' })
    }
}


//update
export const UpdateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const { name, image } = req.body
        let sql = `UPDATE categories SET name='${name}', image='${image}' WHERE cat_id=${id} RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Update category that bai' })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'Update category thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
