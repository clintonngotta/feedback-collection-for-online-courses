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
import { Label } from "@/components/ui/label";
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

export default function FeedbackFormComponent() {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async () => {
		setSubmitted(true);
	};
	return (
		<div className='flex min-h-screen items-center justify-center bg-slate-50 p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>Course Feedback</CardTitle>
					<CardDescription>
						We value your feedback! Please share your thoughts on the course
						you've taken.
					</CardDescription>
				</CardHeader>

				{submitted ? (
					<CardContent className='flex flex-col items-center justify-center py-10 text-center'>
						<CheckCircle className='mb-4 h-16 w-16 text-emerald-500' />
						<h3 className='text-xl font-medium'>Thank You!</h3>
						<p className='mt-2 text-muted-foreground'>
							Your feedback has been submitted successfully.
						</p>
					</CardContent>
				) : (
					<form onSubmit={handleSubmit}>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='name'>Full Name</Label>
								<Input
									id='name'
									name='name'
									placeholder='Enter your full name'
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									name='email'
									type='email'
									placeholder='your.email@example.com'
									required
								/>
							</div>

							<div className='space-y-2 '>
								<Label htmlFor='course'>Course Taken</Label>
								<Select defaultValue='web-development' required>
									<SelectTrigger id='course'>
										<SelectValue placeholder='Select a course' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='web-development'>
											Web Development
										</SelectItem>
										<SelectItem value='data-science'>Data Science</SelectItem>
										<SelectItem value='ui-design'>UI/UX Design</SelectItem>
										<SelectItem value='mobile-dev'>
											Mobile App Development
										</SelectItem>
										<SelectItem value='cloud-computing'>
											Cloud Computing
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='comments'>Comments</Label>
								<Textarea
									id='comments'
									name='comments'
									placeholder='Please share your experience, suggestions, or any other feedback...'
									rows={5}
									required
								/>
							</div>
						</CardContent>

						<CardFooter className='mt-4'>
							<Button type='submit' className='w-full'>
								Submit Feedback
							</Button>
						</CardFooter>
					</form>
				)}
			</Card>
		</div>
	);
}
