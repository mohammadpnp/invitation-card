export type Filter = {
	title: string
};

export default interface Agent {
	id: number,
	title: string,
	description: null | string,
	image: string,
}
