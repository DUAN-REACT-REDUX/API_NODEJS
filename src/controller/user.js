import connect from "../connect";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
//signup
export const signUp = async (req, res) => {
    try {
        const { name, province, district, ward, address, email, password, image, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 5);
        let sql = `INSERT INTO users(name,province,district,ward,address,email,password,image,role)
        VALUES('${name}','${province}','${district}','${ward}','${address}','${email}','${hashedPassword}','${image}','${role}') RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) return res.json({
                message: "Đăng ký thất bại "
            })

            const data = result.rows[0]
            const accesstoken = jwt.sign({ id: data.id }, "du_an_fw2", { expiresIn: "1d" });
            return res.json({
                message: "Đăng ký thành công",
                accesstoken,
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
        let sql = `SELECT * FROM users WHERE email='${email}'`;

        connect.query(sql, async (err, result) => {
            if (err) {
                console.error(err);
                return res.json({
                    message: "Đăng nhập thất bại",
                });
            }
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    const accesstoken = jwt.sign({ id: user.id }, "du_an_fw2", {
                        expiresIn: "1d",
                    });
                    return res.json({
                        message: "Đăng nhập thành công",
                        accesstoken,
                        user,
                    });
                }
            }
            return res.json({
                message: "Email hoặc mật khẩu không chính xác",
            });
        });
    } catch (error) {
        return res.json({
            message: "Lỗi api",
        });
    }
};



