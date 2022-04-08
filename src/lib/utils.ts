export const truncateString = (string: string, limit: number) => {
	return string.length > limit ? `${string.substring(0, limit)}...` : string;
};

export const formatSeconds = (seconds: number) => {
	return new Date(1000 * seconds).toISOString().substr(11, 8);
};
