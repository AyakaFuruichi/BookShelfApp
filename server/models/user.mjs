import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import Joi  from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

export const User = model("user", userSchema);

export const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().ref("First Name"),
		lastName: Joi.string().required().ref("Last Name"),
		email: Joi.string().email().required().ref("Email"),
		password: passwordComplexity().required().ref("Password"),
	});
	return schema.validate(data);
};
