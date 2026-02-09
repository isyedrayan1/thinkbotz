export type DriveImage = {
	id: string;
	name: string;
	createdTime?: string;
	thumbnailUrl: string;
	fullUrl: string;
};

export type DriveGallerySection = {
	title: string;
	folderId: string;
	images: DriveImage[];
};

export type DriveGalleryConfig = {
	apiKey: string;
	folderId: string;
	pageSize?: number;
};

const buildThumbnailUrl = (id: string) =>
	`https://drive.google.com/thumbnail?id=${id}&sz=w800`;

const buildFullUrl = (id: string) =>
	`https://drive.google.com/thumbnail?id=${id}&sz=w4000`;

export const fetchDriveImages = async (
	config: DriveGalleryConfig,
	signal?: AbortSignal
): Promise<DriveImage[]> => {
	const { apiKey, folderId, pageSize = 200 } = config;

	if (!apiKey || !folderId) {
		throw new Error("Missing Drive API key or folder id.");
	}

	// Query to get images from the folder AND all subfolders
	const params = new URLSearchParams({
		key: apiKey,
		q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
		fields: "files(id,name,createdTime,mimeType)",
		orderBy: "createdTime desc",
		pageSize: String(pageSize),
	});

	const response = await fetch(
		`https://www.googleapis.com/drive/v3/files?${params.toString()}`,
		{ signal }
	);

	if (!response.ok) {
		throw new Error(`Drive API error: ${response.status}`);
	}

	const data = (await response.json()) as {
		files?: Array<{ id: string; name: string; createdTime?: string; mimeType?: string }>;
		nextPageToken?: string;
	};

	let files = data.files ?? [];

	// If there's a next page, fetch it too (for folders with >200 images)
	let nextPageToken = data.nextPageToken;
	while (nextPageToken) {
		const nextParams = new URLSearchParams({
			key: apiKey,
			q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
			fields: "files(id,name,createdTime,mimeType)",
			orderBy: "createdTime desc",
			pageSize: String(pageSize),
			pageToken: nextPageToken,
		});

		const nextResponse = await fetch(
			`https://www.googleapis.com/drive/v3/files?${nextParams.toString()}`,
			{ signal }
		);

		if (!nextResponse.ok) break;

		const nextData = (await nextResponse.json()) as {
			files?: Array<{ id: string; name: string; createdTime?: string }>;
			nextPageToken?: string;
		};

		files = [...files, ...(nextData.files ?? [])];
		nextPageToken = nextData.nextPageToken;
	}

	return files.map((file) => ({
		id: file.id,
		name: file.name,
		createdTime: file.createdTime,
		thumbnailUrl: buildThumbnailUrl(file.id),
		fullUrl: buildFullUrl(file.id),
	}));
};

export const fetchMultipleFolders = async (
	apiKey: string,
	folders: { title: string; folderId: string }[],
	signal?: AbortSignal
): Promise<DriveGallerySection[]> => {
	const results = await Promise.all(
		folders.map(async (folder) => {
			try {
				if (!folder.folderId) {
					console.warn(`❌ ${folder.title}: No folder ID found`);
					return { title: folder.title, folderId: folder.folderId, images: [] };
				}
				const images = await fetchDriveImages(
					{ apiKey, folderId: folder.folderId },
					signal
				);
				console.log(`✅ ${folder.title}: Loaded ${images.length} images`);
				return { title: folder.title, folderId: folder.folderId, images };
			} catch (error) {
				console.error(`❌ ${folder.title}: ${error instanceof Error ? error.message : 'Unknown error'}`);
				return { title: folder.title, folderId: folder.folderId, images: [] };
			}
		})
	);
	return results;
};

export const hardcodedGallerySections = [
	{
		title: "MindSpark",
		images: [
			{
				id: "1",
				name: "Image 1",
				thumbnailUrl: "https://example.com/mindspark-thumbnail.jpg",
				fullUrl: "https://example.com/mindspark-full.jpg",
			},
		],
	},
	{
		title: "PromptFusion",
		images: [
			{
				id: "2",
				name: "Image 2",
				thumbnailUrl: "https://example.com/promptfusion-thumbnail.jpg",
				fullUrl: "https://example.com/promptfusion-full.jpg",
			},
		],
	},
	{
		title: "PosterVision",
		images: [
			{
				id: "3",
				name: "Image 3",
				thumbnailUrl: "https://example.com/postervision-thumbnail.jpg",
				fullUrl: "https://example.com/postervision-full.jpg",
			},
		],
	},
	{
		title: "PromptStack",
		images: [
			{
				id: "4",
				name: "Image 4",
				thumbnailUrl: "https://example.com/promptstack-thumbnail.jpg",
				fullUrl: "https://example.com/promptstack-full.jpg",
			},
		],
	},
];
