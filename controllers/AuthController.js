// Import model schema User
import User from '../models/User.js';

// Membuat post data
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

		// Simpan req berdasarkan data register user ke dalam model schema
		const newUser = new User({
			fullname: req.body.fullname,
			email: req.body.email,
			password: req.body.password,
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

export { register };
