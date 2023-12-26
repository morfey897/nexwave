export function isNotNull<T>(key: string) {
	return (item: any): item is T => item[key] !== null;
}
