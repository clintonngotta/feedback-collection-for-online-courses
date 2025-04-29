"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitFeedback(formData: FormData) {
	const name = formData.get("name")?.toString();
	const email = formData.get("email")?.toString();
	const course = formData.get("course")?.toString();
	const rating = formData.get("rating")?.toString();
	const comments = formData.get("comments")?.toString();

	if (!name || !email || !course || !comments) {
		throw new Error("All fields are required");
	}

	try {
		const response = await prisma.feedback.create({
			data: {
				name,
				email,
				course,
				rating: parseInt(rating || "0"),
				comments,
			},
		});
		revalidatePath("/feedback");
		return response;
	} catch (error) {
		console.error("Error creating feedback:", error);
		throw new Error("Failed to submit feedback. Please try again later.");
	}
}

export async function getFeedback() {
	try {
		const feedback = await prisma.feedback.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
		if (!feedback) {
			throw new Error("No feedback found");
		}
		return feedback;
	} catch (error) {
		console.error("Error fetching feedback:", error);
		throw new Error("Failed to fetch feedback. Please try again later.");
	}
}
