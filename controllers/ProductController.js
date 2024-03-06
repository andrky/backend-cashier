// Import model schema Category
import Product from '../models/Product.js';

// Membuat get data
const index = async (req, res) => {
	// try {
	// 	// Membuat await untuk melakukan get data dari db
	// 	const categories = await Category.find();
	// 	// Jika data pada categories kosong
	// 	if (!categories) {
	// 		throw { code: 500, message: 'Get categories failed' };
	// 	}
	// 	// Jika berhasil store return respon 200
	// 	return res.status(200).json({
	// 		status: true,
	// 		total: categories.length,
	// 		categories,
	// 	});
	// } catch (error) {
	// 	// Jika gagal store return
	// 	return res.status(error.code).json({
	// 		status: false,
	// 		message: error.message,
	// 	});
	// }
};

// Membuat post data
const store = async (req, res) => {
	try {
		// Kondisi jika ada req pada title kosong
		// if (!req.body.title) {
		// 	throw { code: 428, message: 'Field is required!' };
		// }

		// Simpan req body
		const title = req.body.title;
		const thumbnail = req.body.thumbnail;
		const price = req.body.price;
		const categoryId = req.body.categoryId;

		// Simpan req berdasarkan product ke dalam model schema
		const newProduct = new Product({
			title: title,
			thumbnail: thumbnail,
			price: price,
			categoryId: categoryId,
		});

		// Membuat await untuk melakukan store data ke db
		const product = await newProduct.save();

		// Jika data pada product kosong
		if (!product) {
			throw { code: 500, message: 'Store product failed' };
		}

		// Jika berhasil store return respon 200
		return res.status(200).json({
			status: true,
			product,
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
