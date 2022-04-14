export interface TrendingPodcasts {
	status: true | false;
	feeds: {
		id: number;
		url: string;
		title: string;
		description: string;
		author: string;
		image: string;
		newestItemPublishedTime: number;
		itunesId: number;
		trendScore: number;
		language: string;
		categories: {
			[id: number]: string;
		};
	}[];
	count: number;
	max: number;
	since: number;
	description: string;
}

export interface PodcastsByFeedId {
	status: true | false;
	query: {
		id: string;
	};
	feed: {
		id: number;
		podcastGuid: string;
		title: string;
		url: string;
		originalUrl: string;
		link: string;
		description: string;
		author: string;
		ownerName: string;
		image: string;
		artwork: string;
		lastUpdateTime: number;
		lastCrawlTime: number;
		lastParseTime: number;
		lastGoodHttpStatusTime: number;
		lastHttpStatus: number;
		contentType: string;
		itunesId: number;
		generator: string;
		language: string;
		type: 0 | 1;
		dead: number;
		chash: string;
		episodeCount: number;
		crawlErrors: number;
		parseErrors: number;
		categories: {
			[id: number]: string;
		};
		locked: 0 | 1;
		imageUrlHash: number;
		value: {
			model: {
				type: 'lightning' | 'hive' | 'webmonetization';
				method: string;
				suggested: string;
			};
			destinations: {
				name: string;
				address: string;
				type: 'node';
				split: number;
				fee: boolean;
			}[];
		};
		funding: {
			url: string;
			message: string;
		};
	};
	description: string;
}

export interface EpisodesByFeedId {
	status: true | false;
	items: {
		id: number;
		title: string;
		link: string;
		description: string;
		guid: string;
		datePublished: number;
		datePublishedPretty: string;
		dateCrawled: number;
		enclosureUrl: string;
		enclosureType: string;
		enclosureLength: number;
		duration: number;
		explicit: 0 | 1;
		episode: number;
		episodeType: 'full' | 'trailer' | 'bonus';
		season: number;
		image: string;
		feedItunesId: number;
		feedImage: string;
		feedId: number;
		feedLanguage: string;
		chaptersUrl: string;
		transcripts: {
			url: string;
			type:
				| 'application/json'
				| 'application/srt'
				| 'text/html'
				| 'text/plain'
				| 'text/srt'
				| 'text/vtt';
		}[];
		soundbite: {
			startTime: number;
			duration: number;
			title: string;
		};
		soundbites: {
			startTime: number;
			duration: number;
			title: string;
		}[];
	}[];
	value: {
		model: {
			type: 'lightning' | 'hive' | 'webmonetization';
			method: string;
			suggested: string;
		};
		destinations: {
			name: string;
			address: string;
			type: 'node';
			split: number;
			fee: boolean;
		}[];
	};
	count: number;
}
