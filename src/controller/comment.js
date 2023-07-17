import connect from "../connect";

export const AddComment = async (req, res) => {
    try {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!req.user) {
            return res.status(401).json({ message: 'Bạn cần đăng nhập để comment comment' });
        }

        const { productId, content } = req.body;
        const comment_time = new Date().toISOString();
        let sql = `INSERT INTO comments(product_id,user_id, content,comment_time )
        VALUES('${productId}','${req.user.id}', '${content}', '${comment_time}') RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Thêm comment thất bại' })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'Comment thành công', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi API' })
    }
}