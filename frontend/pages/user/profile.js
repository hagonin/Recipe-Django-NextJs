import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import RecipeCard from '@components/Recipe/RecipeCard';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Tabs, { TabPanel } from '@components/UI/Tabs';
import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import api from '@services/axios';
import { images } from '@utils/constants';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Profile() {
	const router = useRouter();
	const { user, token } = useAuthContext();
	const { recipes, loading, getAllRecipes } = useRecipeContext();
	const handleDelete = async (slug) => {
		try {
			await api.delete(`/recipe/recipe-create/${slug}`, {
				headers: {
					Authorization: `Bearer ${token.access}`,
				},
			});
			toast.success('Delete success');
			await getAllRecipes();
		} catch (err) {
			toast.error('Delete failed');
			console.log(err);
		}
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
						{loading
							? 'Loading...'
							: recipes?.map((recipe) => (
									<div key={recipe.id}>
										<RecipeCard
											{...recipe}
											smallCard
											id={undefined}
											hasControl
											handleDelete={handleDelete}
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
