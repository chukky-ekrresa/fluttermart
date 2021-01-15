export const fieldError = (field: string, erroObj: any) => {
	return erroObj?.response?.data?.errors?.[`${field}`] ?? '';
};
