import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { feedback } from "generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface FeedbacktableComponentProps {
	fedbackData: feedback[];
}

export default function FeedbacktableComponent({
	fedbackData,
}: FeedbacktableComponentProps) {
	return (
		<Card>
			<CardContent className='p-0'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Student</TableHead>
							<TableHead>Course</TableHead>
							<TableHead>Duration</TableHead>
							<TableHead>Rating</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Comments</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{fedbackData.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className='text-center py-8 text-muted-foreground'>
									No feedback found. Try adjusting your filters.
								</TableCell>
							</TableRow>
						) : (
							fedbackData.map((feedback, index) => (
								<TableRow
									key={index}
									className='cursor-pointer hover:bg-muted/50'>
									<TableCell>
										<div className='flex items-center gap-3'>
											<div>
												<div className='font-medium'>{feedback.name}</div>
												<div className='text-xs text-muted-foreground'>
													{feedback.email}
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant='outline' className='capitalize'>
											{feedback?.course?.name}
										</Badge>
									</TableCell>
									<TableCell>{feedback?.course?.duration}</TableCell>
									<TableCell>
										<div className='flex items-center'>
											{feedback.rating}/5
											<div className='ml-2 flex'>
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className={`h-3 w-3 ${
															i < (feedback?.rating ?? 0)
																? "fill-yellow-400 text-yellow-400"
																: "text-muted-foreground"
														}`}
													/>
												))}
											</div>
										</div>
									</TableCell>
									<TableCell>{feedback.createdAt.toISOString()}</TableCell>
									<TableCell>
										{feedback.comment.length > 50 ? (
											<div className='text-sm text-muted-foreground'>
												{feedback.comment.slice(0, 50)}...
											</div>
										) : (
											<div className='text-sm text-muted-foreground'>
												{feedback.comment}
											</div>
										)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
