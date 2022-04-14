export const truncateString = (string: string, limit: number) => {
	return string.length > limit ? `${string.substring(0, limit)}...` : string;
};

export const formatSeconds = (seconds: number) => {
	return seconds >= 3600
		? new Date(1000 * seconds).toISOString().slice(11, 19)
		: new Date(1000 * seconds).toISOString().slice(14, 19);
};

export const stripTags = (string: string) => {
	return string.replace(/(<([^>]+)>)/gi, ' ').replace(/\s{2,}/g, ' ');
};
