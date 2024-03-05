import category from '../models/Category.js';

const store = async (req, res) => {
	try {
		const title = req.body.title;

		const newCategory = new category({
			title: title,
		});

		const Category = await newCategory.save();

		if (!Category.title) {
			throw { code: 500, message: 'Store category failed' };
		}

		return res.status(200).json({
			status: true,
			Category,
		});
	} catch (error) {
		return res.status(error.code).json({
			status: false,
			message: error.message,
		});
	}
};

export { store };
