import { useQuery, useMutation } from 'react-query';
import request from '../utils/request';

import axios from 'axios';

const fetch = async (axiosOptions = {}) => {
	const source = axios.CancelToken.source();

	const { data } = await request({
		method: 'GET',
		cancelToken: source.token,
		...axiosOptions,
	});

	data.cancel = () => {
		source.cancel('Request was cancelled');
	};

	return data;
};

const appMutate = async (axiosOptions = {}) => {
	const { data } = await request({
		method: 'POST',
		...axiosOptions,
	});

	return data;
};

export const useAppQuery = (queryKeyPrefix = '', axiosOptions: any, queryOptions = {}) => {
	const { url } = axiosOptions;
	const { data, error, isLoading } = useQuery(
		[`${queryKeyPrefix}-${url}`],
		() => fetch(axiosOptions),
		{
			onError: (error: any) => {
				if (error.response) {
					if (error.response.status === 401) {
						// TODO: Call logout action here.
					}
				}
			},
			...queryOptions,
		}
	);

	return { data, error, isLoading };
};

export const useAppMutation: any = (axiosOptions = {}, queryOptions = {}) => {
	return useMutation(() => appMutate(axiosOptions), {
		...queryOptions,
		onError: (error: any) => {
			if (error.response) {
				if (error.response.status === 401) {
					// TODO: Call logout action here.
				}
			}
		},
	});
};
