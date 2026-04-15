import * as authService from "./auth.service.js";

// REGISTER
const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

// ME
const getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export {
    register,
    login,
    getMe,
};