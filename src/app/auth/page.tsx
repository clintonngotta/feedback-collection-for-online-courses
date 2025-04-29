"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useAuth } from "./auth-context";

// Define the validation schema using Zod
const formSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }),
});
type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
	const [error, setError] = useState<string | null>(null);
	const password = process.env.NEXT_PUBLIC_DEMO_LOGIN_PASSWORD;
	const email = process.env.NEXT_PUBLIC_DEMO_EMAIL;

	const router = useRouter();
	const { login } = useAuth();
	// Initialize React Hook Form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Handle form submission
	const onSubmit = async (data: FormValues) => {
		setError(null);
		if (data.email === email && data.password === password) {
			login();
			router.push("/admin");
		} else {
			setError("Invalid email or password. Please try again.");
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-slate-50 p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<div className='flex items-center mb-2'>
						<Link href='/' className='mr-4'>
							<Button variant='ghost' size='icon' className='h-8 w-8'>
								<ArrowLeft className='h-4 w-4' />
								<span className='sr-only'>Back to Feedback Form</span>
							</Button>
						</Link>
						<CardTitle className='text-2xl font-bold'>Admin Login</CardTitle>
					</div>
					<CardDescription>
						Enter your credentials to access the admin dashboard.
					</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<CardContent className='space-y-4'>
							{error && (
								<Alert variant='destructive'>
									<AlertCircle className='h-4 w-4' />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='admin@example.com'
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

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='••••••••'
												{...field}
												className={
													form.formState.errors.password
														? "border-destructive"
														: ""
												}
											/>
										</FormControl>
										<FormMessage />
										<div className='text-xs text-muted-foreground'>
											For demo: Use email <p className='font-mono'>{email}</p>{" "}
											and password <p className='font-mono'>{password}</p>
										</div>
									</FormItem>
								)}
							/>
						</CardContent>

						<CardFooter>
							<Button
								type='submit'
								className='w-full cursor-pointer'
								disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting ? "Logging in..." : "Login"}
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
}
