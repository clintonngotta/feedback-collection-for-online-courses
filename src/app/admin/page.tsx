import { ProtectedRoute } from "../auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
	// Users,
	// BookOpen,
	MessageSquare,
	// Search,
	// Filter,
	// ChevronDown,
	// Star,
	Download,
	Star,
	Users,
	BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeedback, getFeedbackStats } from "@/actions/feedback";
import Link from "next/link";
import FeedbacktableComponent from "../components/FeedbackTableComponent";
export default async function AdminPage() {
	const fedbackData = await getFeedback();
	const {
		totalFeedback,
		averageRating,
		uniqueStudents,
		courseWithMostFeedback,
	} = await getFeedbackStats();
	console.log("fedbackData", fedbackData);
	console.log("courseWithMostFeedback:", courseWithMostFeedback);

	return (
		<ProtectedRoute>
			<div className='min-h-screen  bg-slate-50 p-4'>
				<div className='flex-1 overflow-auto'>
					<div className='p-6 space-y-6'>
						<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
							<div>
								<h1 className='text-2xl font-bold tracking-tight'>
									Feedback Dashboard
								</h1>
								<p className='text-muted-foreground'>
									Monitor and analyze course feedback submissions
								</p>
							</div>
							<div>
								<Link
									href='/'
									className='text-sm text-blue-500 hover:underline'>
									<Button className='mr-2'>
										<MessageSquare className='mr-2 h-4 w-4' />
										Submit Feedback
									</Button>
								</Link>
								<Link
									href='/'
									className='text-sm text-blue-500 hover:underline'>
									<Button className='mr-2'>
										<MessageSquare className='mr-2 h-4 w-4' />
										Add Course
									</Button>
								</Link>
								<Button>
									<Download className='mr-2 h-4 w-4' />
									Export Data
								</Button>
							</div>
						</div>

						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										Total Feedback
									</CardTitle>
									<MessageSquare className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-4xl font-bold -mt-4'>
										{totalFeedback}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										Average Rating
									</CardTitle>
									<Star className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-4xl font-bold -mt-4'>
										{averageRating}/5.0
									</div>
									<p className='text-xs text-muted-foreground'>
										{Number(averageRating) > 4
											? "Excellent"
											: Number(averageRating) > 3
											? "Good"
											: "Needs improvement"}
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										Unique Students
									</CardTitle>
									<Users className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className='text-4xl font-bold -mt-4'>
										{uniqueStudents}
									</div>
									<p className='text-xs text-muted-foreground'>
										Across all courses
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										Most Popular Course
									</CardTitle>
									<BookOpen className='h-4 w-4 text-muted-foreground' />
								</CardHeader>
								<CardContent>
									<div className=' font-bold capitalize -mt-4'>
										{courseWithMostFeedback.courseName}
									</div>
									<p className='text-xs text-muted-foreground'>
										{courseWithMostFeedback.feedbackCount} submissions
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
				<div className='p-4'>
					<FeedbacktableComponent fedbackData={fedbackData} />
				</div>
			</div>
		</ProtectedRoute>
	);
}
