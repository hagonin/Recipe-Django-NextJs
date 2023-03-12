import api from '@services/axios';
import {
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_IMAGE,
	ENDPOINT_RECIPE_READ,
} from '@utils/constants';
import noCache from '@utils/noCache';
import useRecipes from 'hook/useRecipes';
import { toast } from 'react-toastify';
import { useAuthContext } from './auth-context';

const { createContext, useContext, useState, useEffect } = require('react');

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
	const { configAuth, user, setUser } = useAuthContext();
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
	} = useRecipes();

	const deleteRecipe = (slug) =>
		api.delete(`${ENDPOINT_RECIPE_DETAIL}${slug}/`, configAuth());

	const deletePhotoById = (id) =>
		api.delete(`${ENDPOINT_RECIPE_IMAGE}${id}/`, configAuth());

	const handleToggleBookmark = async (act, id) => {
		setLoading(true);
		if (!act) {
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
				toast.success('Add bookmark success');
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
				toast.success('Remove bookmark success');
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
			.get(url, configAuth())
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
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
export const useRecipeContext = () => useContext(RecipeContext);
