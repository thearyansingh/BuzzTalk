import jwt from "jsonwebtoken";

const Authjs = async (req, res, next) => {
    try {
        const tokenValue = req.cookies.token;

        if (!tokenValue) {
            return res.status(401).json({ message: "User not authenticated" });
        }


        const decode = await jwt.verify(tokenValue, process.env.JWT_TOKEN);

        if (!decode) {
            return res.status(401).json({ message: "Invalid user" });
        }

        req.id = decode.id;
          console.log(req.id)
        next();
    } catch (error) {
        console.error("Error in middleware:", error);
        return res.status(500).json({ message: "Error during user Verification" });
    }
};

export default Authjs;
