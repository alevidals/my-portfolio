import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
	const user = await currentUser();

	return (
		<main>
			<div>Hello, World!</div>
			{user && <p>You are signed in as {user.fullName}! :)</p>}
		</main>
	);
}
