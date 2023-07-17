import jwt from "jsonwebtoken";
import connect from "../connect";

export const AddToCart = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        //xu ly khi dang nhap
        if (token) {
            try {
                const decoded = jwt.verify(token, "boquan");
                const userId = decoded._id;
                console.log(userId);
                let sqlUser = `SELECT * FROM users WHERE user_id=${userId} RETURNING *`
                let user
                let cart
                const products = []
                connect.query(sqlUser, async (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Truy van user that bai" });
                    }
                    user = result.rows[0];
                    await user.save()
                    if (!user.cart) {
                        let sqlCart = `INSERT INTO carts(user_id,products) 
                        VALUES (${userId}, ${products}) RETURNING *`
                        connect.query(sqlCart, async (err, result) => {
                            if (err) {
                                return res.status(500).json({ message: "Tao cart that bai" })
                            }
                            cart = result.rows[0]
                            user.cart = cart.cart_id
                            await user.save()
                        })
                    } else {
                        let sqlCart = `SELECT * FROM carts WHERE cart_id=${user.cart} RETURNING *`
                        connect.query(sqlCart, async (err, result) => {
                            if (err) {
                                return res.status(500).json({ message: "Tim cart theo cart user that bai" })
                            }
                            cart = result.rows[0]
                            await cart.save()
                        })
                    }
                    const { product_id } = req.body
                    cart.products.push(product_id)
                    await cart.save()
                    return res.status(200).json({ message: "Them san pham vao cart thanh cong", cart })
                })
            } catch (err) {
                return res.status(500).json({ message: "Loi khi Add To Cart da dang nhap" })
            }
        } else {
            const { product_id } = req.body
            let cart
            let products = []
            let sqlAddCart = `INSERT INTO carts (products) VALUES ($1) RETURNING *`
            let values = [products];
            connect.query(sqlAddCart, values, async (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Loi tao cart", err })
                }
                cart = result.rows[0]
                if (cart.cart_id) {
                    console.log(product_id);
                    cart.products.push(product_id)
                    console.log(cart.products);
                    return res.status(200).json({ message: "Them vao gio hang thanh cong", cart })
                } else {
                    return res.status(404).json({ message: "Tao cart bi loi" })
                }
            })
        }
    } catch (err) {
        return res.status(500).json({ message: "Loi API" })
    }
}