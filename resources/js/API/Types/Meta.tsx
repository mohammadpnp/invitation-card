type Link = {
	url: null | string,
	label: string,
	active: boolean
};

export default interface Meta {
	current_page: number,
	from: number,
	last_page: number,
	links: Link[],
	path: string,
	per_page: number,
	to: number,
	total: number
}
