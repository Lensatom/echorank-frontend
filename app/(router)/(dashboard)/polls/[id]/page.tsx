import { PollDetails } from "@/features/polls/pages"

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params
	return <PollDetails id={id} />
}