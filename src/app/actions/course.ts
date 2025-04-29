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
				duration: duration,
				slug: slug || name.replace(/\s+/g, "-").toLowerCase(),
			},
		});
		return response;
	} catch (error) {
		console.error("Error creating course:", error);
		throw new Error("Failed to create course. Please try again later.");
	}
}

export async function defaultCourses() {
	await prisma.course.createMany({
		data: [
			{
				name: "Fullstack Development with React",
				description: "Learn fullstack development with React and Node.js",
				duration: "6 months",
				slug: "fullstack-development-with-react",
			},
			{
				name: "backend development with Node.js",
				description: "Learn backend development with Node.js and Express",
				duration: "4 months",
				slug: "backend-development-with-nodejs",
			},
			{
				name: "database management with MongoDB",
				description: "Learn database management with MongoDB and Mongoose",
				duration: "3 months",
				slug: "database-management-with-mongodb",
			},
		],
	});
}
