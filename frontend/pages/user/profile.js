import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import { images } from '@utils/constants';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import RecipeCard from '@components/Recipe/RecipeCard';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Tabs, { TabPanel } from '@components/UI/Tabs';

function Profile() {
	const { user, handleToggleBookmark } = useAuthContext();
	const { deleteRecipe, fetcher } = useRecipeContext();
	const {
		data: recipes,
		isLoading: loading1,
		mutate: mutate1,
	} = useSWR(`/user/${user.username}/recipes`, fetcher);
	const [deleting, setDeleting] = useState(false);

	const {
		data: bookmarks,
		isLoading: loading2,
		mutate: mutate2,
	} = useSWR(`/user/profile/${user.id}/bookmarks`, fetcher);
	const router = useRouter();

	const handleDeleteRecipe = async (slug) => {
		try {
			setDeleting(true);
			await deleteRecipe(slug);
			await mutate1();
			toast.success('Delete success');
		} catch (err) {
			toast.error('Delete failed');
		} finally {
			setDeleting(false);
		}
	};

	const goToUpdate = (slug) => router.push(`/user/recipe/${slug}/update/`);
	const goToAddPhoto = (id, slug) =>
		router.push(`/user/recipe/${slug}/upload_image/${id}`);

	const onDeleteBookmark = async (act, id) => {
		await handleToggleBookmark(act, id);
		await mutate2();
	};

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
					<span>id:{user?.id}</span>
					<h2>Last Name: {user?.last_name}</h2>
					<h2>First Name: {user?.first_name}</h2>
					<h2>User name: {user?.username}</h2>

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
			{deleting && 'Deleting...'}
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
											handleDelete={handleDeleteRecipe}
											goToUpdate={goToUpdate}
											goToAddPhoto={goToAddPhoto}
											secondary
										/>
										<span>{recipe.author}</span>
									</div>
							  ))}
					</div>
				</TabPanel>
				<TabPanel tab="Bookmarks">
					{loading2 ? (
						'Loading...'
					) : bookmarks.length > 0 ? (
						<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-y-6">
							{bookmarks.map((bookmark) => (
								<RecipeCard
									image={bookmark.image_url}
									name={bookmark.title}
									date={
										bookmark.updated_at ||
										bookmark.created_at
									}
									category={bookmark.category}
									smallCard
									slug={bookmark.slug}
									id={bookmark.id}
									actBookmark
									handleToggleBookmark={onDeleteBookmark}
									noBookmark
								/>
							))}
						</div>
					) : (
						'Empty'
					)}
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Profile;

Profile.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
