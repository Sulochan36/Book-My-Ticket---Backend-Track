import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    createUser,
    findUserByEmail,
    findUserById,
} from "./auth.model.js";

// REGISTER
const register = async ({ name, email, password }) => {
    const existing = await findUserByEmail(email);
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

// LOGIN
const login = async ({ email, password }) => {
    const user = await findUserByEmail(email);

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        user: { id: user.id, name: user.name, email: user.email },
        token,
    };
};

// GET PROFILE
const getMe = async (id) => {
    return await findUserById(id);
};

export {
    register,
    login,
    getMe,
};