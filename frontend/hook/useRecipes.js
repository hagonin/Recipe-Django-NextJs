import api from '@services/axios';
import { ENDPOINT_RECIPE } from '@utils/constants';
import { useState } from 'react';
import useSWR from 'swr';

const useRecipes = () => {
	return useSWR(ENDPOINT_RECIPE, (url) => api.get(url));
};

export default useRecipes;
