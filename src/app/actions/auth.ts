"use server";

import prisma from "@/lib/prisma";

export async function loginUser(formData: FormData) {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		throw new Error("All fields are required");
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		if (user.password !== password) {
			throw new Error("Invalid password");
		}

		return user;
	} catch (error) {
		console.error("Error logging in user:", error);
		throw new Error("Failed to log in. Please try again later.");
	}
}
export async function registerUser(formData: FormData) {
	const name = formData.get("name")?.toString();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!name || !email || !password) {
		throw new Error("All fields are required");
	}

	try {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
				role: "user", // Assign a default role or fetch it dynamically
			},
		});

		return user;
	} catch (error) {
		console.error("Error registering user:", error);
		throw new Error("Failed to register. Please try again later.");
	}
}
export async function getUser(email: string) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw new Error("Failed to fetch user. Please try again later.");
	}
}
export async function updateUser(formData: FormData) {
	const id = formData.get("id")?.toString();
	const name = formData.get("name")?.toString();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!id || !name || !email || !password) {
		throw new Error("All fields are required");
	}

	try {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				password,
			},
		});

		return user;
	} catch (error) {
		console.error("Error updating user:", error);
		throw new Error("Failed to update user. Please try again later.");
	}
}
export async function deleteUser(id: string) {
	try {
		const user = await prisma.user.delete({
			where: {
				id,
			},
		});

		return user;
	} catch (error) {
		console.error("Error deleting user:", error);
		throw new Error("Failed to delete user. Please try again later.");
	}
}
