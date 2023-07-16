import connect from "../connect";

//signup
export const signUp = (req, res) => {
    try {
        const { name, province, district, ward, address, email, password, image, role } = req.body;
        let sql = `INSERT INTO users(name,province,district,ward,address,email,password,image,role)
        VALUES('${name}','${province}','${district}','${ward}','${address}','${email}','${password}','${image}','${role}') RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) return res.json({
                message: "Đăng ký thất bại "
            })
            const data = result.rows[0]
            return res.json({
                message: "Đăng ký thành công",
                data
            })
        })
    } catch (error) {
        return res.json({
            message: "Lỗi api"
        })
    }
}


//signin



