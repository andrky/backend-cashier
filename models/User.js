// Import library mongoose
import mongoose from 'mongoose';

// Buat model schema untuk field user
const Schema = mongoose.Schema(
	{
		fullname: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			enum: ['administrator', 'cashier', 'employee'],
			default: 'cashier',
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

export default mongoose.model('User', Schema);
