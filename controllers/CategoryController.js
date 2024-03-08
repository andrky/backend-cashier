// Import model schema Category
import Category from '../models/Category.js';

// Membuat get data
const index = async (req, res) => {
	try {
		// Membuat await untuk melakukan get data dari db
		const categories = await Category.find({ status: 'active' });

		// isRequired, jika data pada categories kosong
		if (!categories) {
			throw { code: 500, message: 'GET_CATEGORIES_FAILED' };
		}

		// Jika berhasil store return respon 200
		return res.status(200).json({
			status: true,
			total: categories.length,
			categories,
		});
	} catch (error) {
		// Jika gagal store return
		return res.status(error.code).json({
			status: false,
			message: error.message,
		});
	}
};

// Membuat post data
const store = async (req, res) => {
	try {
		// Kondisi jika ada req pada title kosong
		if (!req.body.title) {
			throw { code: 428, message: 'FIELD_REQUIRED' };
		}

		// Simpan req body
		const title = req.body.title;

		// Simpan req berdasarkan category ke dalam model schema
		const newCategory = new Category({
			title: title,
		});

		// Membuat await untuk melakukan store data ke db
		const category = await newCategory.save();

		// Jika data pada category kosong
		if (!category) {
			throw { code: 500, message: 'STORE_CATEGORY_FAILED' };
		}

		// Jika berhasil store return respon 200
		return res.status(200).json({
			status: true,
			category,
		});
	} catch (error) {
		// Jika gagal store return
		return res.status(error.code).json({
			status: false,
			message: error.message,
		});
	}
};

export { index, store };
