// Import model schema category
import category from '../models/Category.js';

// Membuat async
const store = async (req, res) => {
	try {
		// Kondisi jika ada req pada title kosong
		if (!req.body.title) {
			throw { code: 428, message: 'Field is required!' };
		}

		// Simpan req body
		const title = req.body.title;

		// Simpan req berdasarkan category ke dalam model schema
		const newCategory = new category({
			title: title,
		});

		// Membuat await untuk melakukan store data ke db
		const Category = await newCategory.save();

		// Jika data pada Category kosong
		if (!Category) {
			throw { code: 500, message: 'Store category failed' };
		}

		// Jika berhasil store return respon 200
		return res.status(200).json({
			status: true,
			Category,
		});
	} catch (error) {
		// Jika gagal store return
		return res.status(error.code).json({
			status: false,
			message: error.message,
		});
	}
};

export { store };
