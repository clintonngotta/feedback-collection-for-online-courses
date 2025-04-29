"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitFeedback } from "@/actions/feedback";
import { course } from "generated/prisma";
import Link from "next/link";
// Define the validation schema using Zod
const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters" })
		.regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters" }),
	email: z.string().email({ message: "Please enter a valid email address" }),
	course: z.string().min(1, { message: "Please select a course" }),
	comments: z
		.string()
		.min(10, { message: "Please provide at least 10 characters of feedback" })
		.max(500, { message: "Comments must be less than 500 characters" }),
	rating: z.string().min(1, { message: "Please select a rating" }),
});

type FormValues = z.infer<typeof formSchema>;

interface FeedbackFormComponentProps {
	courses: course[];
}

export default function FeedbackFormComponent({
	courses,
}: FeedbackFormComponentProps) {
	const [submitted, setSubmitted] = useState(false);

	// Initialize React Hook Form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			course: "",
			comments: "",
			rating: "",
		},
		mode: "onBlur", // Validate on blur for better UX
	});
	// Get comments field value for character count
	const commentsValue = form.watch("comments") || "";

	const onSubmit = async (data: FormValues) => {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});
		await submitFeedback(formData);
		setSubmitted(true);

		console.log("Form submitted:", data);
		// Reset form after 3 seconds
		setTimeout(() => {
			form.reset();
			setSubmitted(false);
		}, 3000);
	};
	return (
		<div className='flex min-h-screen items-center justify-center bg-slate-50 p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>Course Feedback</CardTitle>
					<CardDescription>
						We value your feedback! Please share your thoughts on the course
						you&apos;ve taken.
					</CardDescription>
				</CardHeader>

				{submitted ? (
					<CardContent className='flex flex-col items-center justify-center py-10 text-center'>
						<CheckCircle className='mb-4 h-16 w-16 text-emerald-500' />
						<h3 className='text-xl font-medium'>Thank You!</h3>
						<p className='mt-2 text-muted-foreground'>
							Your feedback has been submitted successfully.
						</p>
						<Link href='/admin'>
							<Button className='mt-4'>Dahsboard</Button>
						</Link>
					</CardContent>
				) : (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<CardContent className='space-y-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='flex items-center gap-1'>
												Full Name
												<span className='text-destructive'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter your full name'
													{...field}
													className={
														form.formState.errors.name
															? "border-destructive"
															: ""
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='flex items-center gap-1'>
												Email Address
												<span className='text-destructive'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													type='email'
													placeholder='your.email@example.com'
													{...field}
													className={
														form.formState.errors.email
															? "border-destructive"
															: ""
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex flex-col gap-4 md:flex-row w-full'>
									<FormField
										control={form.control}
										name='course'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='flex items-center gap-1'>
													Course Taken
													<span className='text-destructive'>*</span>
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger
															className={
																form.formState.errors.course
																	? "border-destructive"
																	: ""
															}>
															<SelectValue placeholder='Select a course' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{courses.map((course) => (
															<SelectItem key={course.id} value={course.id}>
																{course.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='rating'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='flex items-center gap-1'>
													Rating
													<span className='text-destructive'>*</span>
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger
															className={
																form.formState.errors.course
																	? "border-destructive"
																	: ""
															}>
															<SelectValue placeholder='Select a course' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value='1'>1 Star</SelectItem>
														<SelectItem value='2'>2 Stars</SelectItem>
														<SelectItem value='3'>3 Stars</SelectItem>
														<SelectItem value='4'>4 Stars</SelectItem>
														<SelectItem value='5'>5 Stars</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name='comments'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='flex items-center gap-1'>
												Comments
												<span className='text-destructive'>*</span>
											</FormLabel>
											<FormControl>
												<div className='space-y-1'>
													<Textarea
														placeholder='Please share your experience, suggestions, or any other feedback...'
														rows={5}
														{...field}
														className={
															form.formState.errors.comments
																? "border-destructive"
																: ""
														}
													/>
													<div className='flex justify-end'>
														<span
															className={`text-xs ${
																commentsValue.length > 500
																	? "text-destructive"
																	: "text-muted-foreground"
															}`}>
															{commentsValue.length}/500
														</span>
													</div>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>

							<CardFooter>
								<Button
									type='submit'
									className='w-full'
									disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting
										? "Submitting..."
										: "Submit Feedback"}
								</Button>
							</CardFooter>
						</form>
					</Form>
				)}
			</Card>
		</div>
	);
}
