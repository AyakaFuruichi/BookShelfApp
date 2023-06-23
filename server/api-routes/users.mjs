import express from "express";
const router = express.Router();
import { User } from "../models/user.mjs";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
	// try {
		const { firstname, lastname, email, password, } = req.body;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const err = errors.array();
			return res.status(400).json(errors.array()[0]);
		}

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		if (password.length < 6) {
			return res.send({ message: "password must be at least 6 characters" });
		}

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });

	// } catch (error) {
	// 	res.status(500).send({ message: "Internal Server Error" });
	// }
});

export default router;
