import FeedbackFormComponent from "./components/FeedbackForm";
import { getCourses } from "./actions/course";

export default async function Home() {
	const get_course = await getCourses();

	return <FeedbackFormComponent courses={get_course} />;
}
