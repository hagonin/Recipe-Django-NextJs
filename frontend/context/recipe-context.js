import api from '@services/axios';
import {
	ENDPOINT_CREATE_RECIPE,
	ENDPOINT_INGREDIENT,
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_IMAGE,
} from '@utils/constants';
import { toast } from 'react-toastify';
import { useAuthContext } from './auth-context';

const { createContext, useContext, useState, useEffect } = require('react');

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
	const { configAuth, user, setUser } = useAuthContext();
	const [loading, setLoading] = useState(false);

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

	const checkBookmarkAct = (bookmarkID) =>
		user?.bookmarks.filter((bookmark) => bookmark === bookmarkID).length >
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
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
export const useRecipeContext = () => useContext(RecipeContext);
