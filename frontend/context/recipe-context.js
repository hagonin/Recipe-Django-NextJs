import { createContext, useContext, useState } from 'react';
import api from '@services/axios';
import {
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_IMAGE,
	ENDPOINT_RECIPE_READ,
} from '@utils/constants';
import noCache from '@utils/noCache';
import toastMessage from '@utils/toastMessage';

import useRecipes from 'hook/useRecipes';

import { useAuthContext } from './auth-context';


const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
	const { configAuth, user, setUser, isAuthenticated } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [slugUpdate, setSlugUpdate] = useState(null);
	const {
		data: recipes,
		isLoading: loadingRecipes,
		mutate: mutateRecipes,
		isValidating: validatingRecipes,
		keywords,
		photos,
		topRating,
		photoRandom,
	} = useRecipes();

	const deleteRecipe = (slug) =>
		api.delete(`${ENDPOINT_RECIPE_DETAIL}${slug}/`, configAuth());

	const deletePhotoById = (id) =>
		api.delete(`${ENDPOINT_RECIPE_IMAGE}${id}/`, configAuth());

	const handleToggleBookmark = async (act, id) => {
		if (!isAuthenticated)
			return toastMessage({
				message: 'Please login first',
				type: 'error',
			});
		if (!act) {
			setLoading(true);
			api.post(
				`user/profile/${user?.id}/bookmarks`,
				{
					id: id,
				},
				configAuth()
			).then((res) => {
				setUser((pre) => {
					const newBookmarks = [...user?.bookmarks, id];
					return { ...pre, bookmarks: newBookmarks };
				});
				setLoading(false);
				toastMessage({
					message: 'Recipe added to wishlist successfully',
					type: 'success',
				});
			});
		} else {
			api.delete(`user/profile/${user?.id}/bookmarks`, {
				headers: configAuth().headers,
				data: {
					id: id,
				},
			}).then(() => {
				setUser((pre) => {
					const newBookmarks = user?.bookmarks.filter(
						(item) => item !== id
					);
					return { ...pre, bookmarks: newBookmarks };
				});
				toastMessage({
					message: 'Recipe removed from wishlist successfully',
					type: 'success',
				});
				setLoading(false);
			});
		}
	};

	const getRecipeBySlug = (slug) =>
		api.get(`${ENDPOINT_RECIPE_READ}${slug}/${noCache()}`);

	const checkBookmarkAct = (bookmarkID) =>
		user?.bookmarks?.filter((bookmark) => bookmark === bookmarkID).length >
		0;
	const fetcher = async (url) =>
		await api
			.get(`${url}${noCache()}`, configAuth())
			.then((res) => res?.data?.results || res?.data);

	return (
		<RecipeContext.Provider
			value={{
				loading,
				setLoading,
				deleteRecipe,
				fetcher,
				deletePhotoById,
				handleToggleBookmark,
				checkBookmarkAct,
				getRecipeBySlug,
				recipes,
				loadingRecipes,
				mutateRecipes,
				validatingRecipes,
				setSlugUpdate,
				slugUpdate,
				keywords,
				topRating,
				photos,
				photoRandom,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
export const useRecipeContext = () => useContext(RecipeContext);
