import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import RecipeCard from '@components/Recipe/RecipeCard';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Tabs, { TabPanel } from '@components/UI/Tabs';
import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import { images } from '@utils/constants';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

function Profile() {
	const { user, fetcher } = useAuthContext();
	const { deleteRecipe } = useRecipeContext();
	const {
		data: recipes,
		isLoading: loading1,
		mutate: mutate1,
	} = useSWR(`/user/${user.username}/recipes/`, fetcher);

	// const {
	// 	data: bookmarks,
	// 	isLoading: loading2,
	// 	mutate: mutate2,
	// } = useSWR(`/user/profile/${user.id}/bookmarks/`, fetcher);
	// console.log('bookmarks', bookmarks);
	const router = useRouter();
	const handleDelete = async (slug) => {
		try {
			await deleteRecipe(slug);
			await mutate1();
			toast.success('Delete success');
		} catch (err) {
			toast.error('Delete failed');
		}
	};

	const goToUpdate = (slug) => router.push(`/user/recipe/${slug}/update/`);
	const goToAddPhoto = (id, slug) =>
		router.push(`/recipes/${id}/upload_image/${slug}`);

	return (
		<div className="container my-14">
			<h1 className="text-center">Profile</h1>
			<div className="flex mt-10 items-center gap-6">
				<Img
					src={user?.avatar || images.defaultAvatar}
					alt="avatar"
					className="h-52 w-52 border border-border rounded-full overflow-hidden"
					cover
				/>
				<div className="flex flex-col">
					<h2>{user?.username}</h2>
					<span className="text-lg mt-1">Email: {user?.email}</span>
					<Button
						type="link"
						href="/user/updateprofile"
						className="mt-3"
					>
						Update Profile
					</Button>
				</div>
			</div>
			<div className="mt-6 bg-primaryLight rounded-md py-4 px-5 flex gap-4 items-center">
				<Img
					src={images.bio}
					className="h-10 w-10"
					alt="bio"
				/>
				<p>{user?.bio}</p>
			</div>
			<Tabs>
				<TabPanel tab="All Recipes">
					<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-x-6 lg:gap-y-10 md:gap-4 gap-2">
						{loading1
							? 'Loading...'
							: recipes?.map((recipe) => (
									<div key={recipe.id}>
										<RecipeCard
											image={recipe.image_url}
											name={recipe.title}
											date={
												recipe.updated_at ||
												recipe.created_at
											}
											smallCard
											slug={recipe.slug}
											id={recipe.id}
											hasControl
											handleDelete={handleDelete}
											goToUpdate={goToUpdate}
											goToAddPhoto={goToAddPhoto}
										/>
										<span>{recipe.author}</span>
									</div>
							  ))}
					</div>
				</TabPanel>
				<TabPanel tab="Bookmarks">
					<div>Bookmarks</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Profile;

Profile.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
