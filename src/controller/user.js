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

export const signIn = (req, res) => {
    try {
        const { email, password } = req.body;
        let sql = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
        connect.query(sql, (err, result) => {
            if (err) {
                return res.json({
                    message: "Đăng nhập thất bại"
                })
            }
            if (result.rows.length > 0) {
                const user = result.rows[0];
                return res.json({
                    message: "Đăng nhập thành công",
                    user
                })
            } else {
                return res.json({
                    message: "Email hoặc mật khẩu không chính xác"
                });
            }
        })
    } catch (error) {
        return res.json({
            message: "Lỗi api"
        })
    }
}



