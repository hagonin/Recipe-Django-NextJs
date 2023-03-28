import { useRouter } from 'next/router';
import useSWR from 'swr';
import { MdEmail, MdSecurity } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import { images, NUMBER_OF_RECIPE_RENDER } from '@utils/constants';
import toastMessage from '@utils/toastMessage';
import { handleExpired, STATUS_EXPIRED } from '@utils/expired_time';
import usePagination from 'hook/usePagination';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import RecipeCard from '@components/Recipe/RecipeCard';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Tabs, { TabPanel } from '@components/UI/Tabs';
import { TitlePrimary } from '@components/UI/Title';
import Pagination from '@components/UI/Pagination';
import Loader from '@components/UI/Loader';

function Profile() {
	const { user } = useAuthContext();
	const { deleteRecipe, fetcher, handleToggleBookmark, mutateRecipes } =
		useRecipeContext();
	const {
		data: recipes,
		isLoading: loading1,
		mutate: mutateOwnRecipe,
	} = useSWR(`/user/${user.username}/recipes`, fetcher);

	const {
		data: bookmarks,
		isLoading: loading2,
		mutate: mutateBookMark,
	} = useSWR(`/user/profile/${user.id}/bookmarks`, fetcher);

	const { currentRecipes, currentPage, pages, setCurrentPage } =
		usePagination({
			limitPerPage: NUMBER_OF_RECIPE_RENDER,
			recipes: recipes,
			total: recipes?.length,
		});

	const {
		currentRecipes: currentBmks,
		currentPage: currentPageBmk,
		pages: pagesBmk,
		setCurrentPage: setCurrentPageBmk,
	} = usePagination({
		limitPerPage: NUMBER_OF_RECIPE_RENDER,
		recipes: bookmarks,
		total: bookmarks?.length,
	});

	const router = useRouter();

	const handleDeleteRecipe = async (slug) => {
		try {
			await deleteRecipe(slug);
			await mutateOwnRecipe();
			mutateRecipes();
			toastMessage({
				message: 'Successfully deleted recipe',
			});
		} catch ({ status }) {
			if (status === STATUS_EXPIRED) {
				handleExpired(user.id);
				router.push('/user/recipe/request_expired');
			} else {
				toastMessage({
					message: 'Delete recipe failed',
					type: 'error',
				});
			}
		}
	};

	const goToUpdate = (slug) => router.push(`/user/recipe/${slug}/update/`);
	const goToAddPhoto = (id, slug) =>
		router.push(`/user/recipe/${slug}/upload_image/${id}`);

	const onDeleteBookmark = async (act, id) => {
		await handleToggleBookmark(act, id);
		await mutateBookMark();
	};

	return (
		<div className="container my-14">
			<TitlePrimary
				title="My Profile"
				center
			/>
			<div className="flex mt-8 items-center lg:gap-6 md:gap-4 gap-y-6 md:flex-row flex-col">
				<Img
					src={user?.avatar || images.defaultAvatar}
					alt="avatar"
					className="md:h-52 md:w-52 h-40 w-40 border border-border  rounded-full overflow-hidden"
					cover
				/>
				<div className="flex flex-col gap-1 max-md:items-center">
					<h2 className="capitalize font-serif ">{`${user?.username}`}</h2>

					<div className="flex">
						<span className="text-lg ">First name:</span>
						<span className="text-lg text-black font-semibold capitalize ml-2">
							{user?.first_name}
						</span>
						<span className="text-lg border-l-2 pl-5 ml-6">
							Last name:
						</span>
						<span className="text-lg text-black font-semibold capitalize ml-2">
							{user?.last_name}
						</span>
					</div>

					<span className="text-lg flex items-center gap-2">
						<MdEmail /> {user?.email}
					</span>
					<div className="flex lg:gap-6 md:gap-4 gap-2 items-center mt-2 md:flex-row flex-col">
						<Button
							type="link"
							href="/user/updateprofile"
							className="outline"
							icon={{ left: <AiFillEdit /> }}
						>
							Update Profile
						</Button>

						<Button
							className="outline"
							onClick={() => router.push('/user/changepassword')}
							icon={{ left: <MdSecurity /> }}
						>
							Change passowrd
						</Button>
					</div>
				</div>
			</div>
			<div className="my-6 bg-primaryLight rounded-md py-4 px-5 flex gap-4 items-center">
				<Img
					src={images.bio}
					className="h-10 w-10"
					alt="bio"
				/>
				<p>{user?.bio}</p>
			</div>

			<Tabs>
				<TabPanel
					tab={{
						title: 'Manage Recipe',
					}}
				>
					<>
						{loading1 ? (
							<Loader type="searching" />
						) : recipes.length > 0 ? (
							<>
								<div className="mb-5 flex gap-4">
									<span className="inline-block text-base">
										You have <b>{recipes.length}</b> recipes
									</span>
									<button
										className="font-semibold text-yellow text-base block underline"
										onClick={() =>
											router.push('/user/recipe/add')
										}
									>
										+ Add recipe
									</button>
								</div>
								<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-y-6 gap-x-2">
									{currentRecipes?.map((recipe) => (
										<div key={recipe.id}>
											<RecipeCard
												main_image={recipe.main_image}
												name={recipe.title}
												smallCard
												slug={recipe.slug}
												id={recipe.id}
												hasControl
												handleDelete={
													handleDeleteRecipe
												}
												goToUpdate={goToUpdate}
												goToAddPhoto={goToAddPhoto}
												secondary
											/>
											<span>{recipe.author}</span>
										</div>
									))}
								</div>
								<Pagination
									pages={pages}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
								/>
							</>
						) : (
							<div className="flex gap-6 items-center">
								<span>You do not have your own recipe.</span>
								<Button
									onClick={() =>
										router.push('/user/recipe/add')
									}
									className="secondary rounded-full"
								>
									+ Add new recipe
								</Button>
							</div>
						)}
					</>
				</TabPanel>
				<TabPanel
					tab={{
						title: 'Collections',
					}}
				>
					{loading2 ? (
						'Loading...'
					) : currentBmks?.length > 0 ? (
						<>
							<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-y-6 gap-x-2">
								{currentBmks.map((bookmark) => (
									<RecipeCard
										key={bookmark.id}
										main_image={bookmark.main_image}
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
							<Pagination
								pages={pagesBmk}
								currentPage={currentPageBmk}
								setCurrentPage={setCurrentPageBmk}
							/>
						</>
					) : (
						<p>You have not saved any bookmarks yet.</p>
					)}
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Profile;

Profile.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
