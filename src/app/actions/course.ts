"use server";
import prisma from "@/lib/prisma";

export async function getCourses() {
	try {
		const courses = await prisma.course.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
		if (!courses) {
			throw new Error("No courses found");
		}
		return courses;
	} catch (error) {
		console.error("Error fetching courses:", error);
		throw new Error("Failed to fetch courses. Please try again later.");
	}
}

export async function getCourse(slug: string) {
	try {
		const course = await prisma.course.findUnique({
			where: {
				slug,
			},
		});
		if (!course) {
			throw new Error("Course not found");
		}
		return course;
	} catch (error) {
		console.error("Error fetching course:", error);
		throw new Error("Failed to fetch course. Please try again later.");
	}
}

export async function createCourse(formData: FormData) {
	const name = formData.get("name")?.toString();
	const description = formData.get("description")?.toString();
	const duration = formData.get("duration")?.toString();
	const slug = formData.get("slug")?.toString();

	if (!name || !description || !duration) {
		throw new Error("All fields are required");
	}

	try {
		const response = await prisma.course.create({
			data: {
				name,
				description,
				duration: parseInt(duration || "0"),
				slug: slug || name.replace(/\s+/g, "-").toLowerCase(),
			},
		});
		return response;
	} catch (error) {
		console.error("Error creating course:", error);
		throw new Error("Failed to create course. Please try again later.");
	}
}
