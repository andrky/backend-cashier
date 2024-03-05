// Import library mongoose
import mongoose from 'mongoose';

// Buat model schema untuk field category
const Schema = mongoose.Schema(
	{
		title: {
			type: String,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
		createdAt: {
			type: Number,
		},
		updatedAt: {
			type: Number,
		},
	},
	{
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
);

export default mongoose.model('Category', Schema);
