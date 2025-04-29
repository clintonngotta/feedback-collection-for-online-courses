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
				course: {
					connect: {
						id: course,
					},
				},
				rating: parseInt(rating || "0"),
				comment: comments,
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
			include: {
				course: true,
			},
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

export async function getFeedbackStats() {
	try {
		const feedback = await prisma.feedback.findMany();
		const uniqueEmailCount = new Set(feedback.map((fb) => fb.email)).size;
		const courseWithMostFeedback = feedback.reduce((acc, fb) => {
			acc[fb.courseId] = (acc[fb.courseId] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);
		console.log("courseWithMostFeedback", courseWithMostFeedback);
		const mostFeedbackCourseId = Object.keys(courseWithMostFeedback).reduce(
			(a, b) => (courseWithMostFeedback[a] > courseWithMostFeedback[b] ? a : b)
		);
		const course = await prisma.course.findUnique({
			where: {
				id: mostFeedbackCourseId,
			},
		});
		const courseName = course?.name || "Unknown Course";

		if (!feedback) {
			throw new Error("No feedback found");
		}
		const totalFeedback = feedback.length;
		const averageRating =
			feedback.reduce((sum, fb) => sum + (fb.rating || 0), 0) / totalFeedback;

		return {
			totalFeedback,
			uniqueStudents: uniqueEmailCount,
			averageRating: averageRating.toFixed(2),
			courseWithMostFeedback: {
				courseName,
				feedbackCount: courseWithMostFeedback[mostFeedbackCourseId],
			},
		};
	} catch (error) {
		console.error("Error fetching feedback stats:", error);
		throw new Error("Failed to fetch feedback stats. Please try again later.");
	}
}
