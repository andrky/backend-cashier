// Import model schema User
import User from '../models/User.js';
// Import library hash password
import bcrypt from 'bcrypt';
// Import jwt
import jsonwebtoken from 'jsonwebtoken';
// Import dotenv untuk akses var yang berada di .env
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

// Function untuk generate access token berdasarkan payload yang dibuat
const generateAccessToken = async (payload) => {
	return jsonwebtoken.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: env.JWT_ACCESS_TOKEN_LIFE });
};

// Function untuk generate refresh token berdasarkan payload yang dibuat
const generateRereshToken = async (payload) => {
	return jsonwebtoken.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: env.JWT_REFRESH_TOKEN_LIFE });
};

// Membuat register post data
const register = async (req, res) => {
	try {
		// Kondisi jika ada req pada fullname, email dan password kosong
		if (!req.body.fullname) {
			throw { code: 428, message: 'Fullname is required' };
		}
		if (!req.body.email) {
			throw { code: 428, message: 'Email is required' };
		}
		if (!req.body.password) {
			throw { code: 428, message: 'Password is required' };
		}

		// Cek email sudah ada
		const emailExist = await User.findOne({ email: req.body.email });
		if (emailExist) {
			throw { code: 409, message: 'EMAIL_EXIST' };
		}

		// Cek password harus sama
		if (req.body.password !== req.body.retype_password) {
			throw { code: 428, message: 'PASSWORD_MUST_MATCH' };
		}

		// Hash password menggunakan bcrypt
		let salt = await bcrypt.genSalt(10);
		let hash = await bcrypt.hash(req.body.password, salt);

		// Simpan req berdasarkan data register user ke dalam model schema
		const newUser = new User({
			fullname: req.body.fullname,
			email: req.body.email,
			password: hash,
			role: req.body.role,
		});

		// Membuat await untuk melakukan store data ke db
		const user = await newUser.save();

		// Jika data pada user kosong
		if (!user) {
			throw { code: 500, message: 'USER_REGISTER_FAILED' };
		}

		// Jika berhasil store return respon 200
		return res.status(200).json({
			status: true,
			message: 'USER_REGISTER_SUCCESS',
			user,
		});
	} catch (error) {
		// Jika error code tidak ada di set ke 500
		if (!error.code) {
			error.code = 500;
		}
		// Jika gagal store return
		return res.status(error.code).json({
			status: false,
			message: error.message,
		});
	}
};

// Membuat login
const login = async (req, res) => {
	try {
		// Kondisi jika ada req pada email dan password kosong
		if (!req.body.email) {
			throw { code: 428, message: 'Email is required' };
		}
		if (!req.body.password) {
			throw { code: 428, message: 'Password is required' };
		}

		// Cek user sudah ada berdasarkan email di database
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			throw { code: 404, message: 'USER_NOT_FOUND' };
		}

		// Cek password sama atau tidak dengan di database
		const passwordIsMatch = await bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsMatch) {
			throw { code: 409, message: 'PASSWORD_WRONG' };
		}

		// Generate token
		const payload = {
			id: user._id,
			role: user.role,
		};
		const accessToken = await generateAccessToken(payload);
		const refreshToken = await generateRereshToken(payload);

		// Jika berhasil store return respon 200
		return res.status(200).json({
			status: true,
			message: 'LOGIN_SUCCESS',
			accessToken,
			refreshToken,
		});
	} catch (error) {
		// Jika error code tidak ada di set ke 500
		if (!error.code) {
			error.code = 500;
		}
		// Jika gagal store return
		return res.status(error.code).json({
			status: false,
			message: error.message,
		});
	}
};

export { register, login };
