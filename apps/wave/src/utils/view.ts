export type TPosition = {
	x: number;
	y: number;
};

export type TSize = {
	width: number;
	height: number;
};

export interface TRect extends TPosition, TSize {}

export function intersection(rect1: TRect, rect2: TRect) {
	const xOverlap = Math.max(
		0,
		Math.min(rect1.x + rect1.width, rect2.x + rect2.width) -
			Math.max(rect1.x, rect2.x)
	);
	const yOverlap = Math.max(
		0,
		Math.min(rect1.y + rect1.height, rect2.y + rect2.height) -
			Math.max(rect1.y, rect2.y)
	);

	return xOverlap * yOverlap;
}

function isRectanglesOverlap(rect1: TRect, rect2: TRect) {
	return (
		rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.y + rect1.height > rect2.y
	);
}

export function detectCollisions(rectangles: TRect[]) {
	// Create events array
	const events: Array<{ type: string; x: number; index: number }> = [];

	rectangles.forEach((rectangle, index) => {
		events.push({ type: 'start', x: rectangle.x, index });
		events.push({ type: 'end', x: rectangle.x + rectangle.width, index });
	});

	// Sort events based on x-coordinate
	events.sort((a, b) => a.x - b.x);

	// Sweep line algorithm to detect overlapping intervals
	const activeRectangles = new Set<number>();
	const collisions: Array<[number, number]> = [];

	events.forEach((event) => {
		const rectIndex = event.index;

		if (event.type === 'start') {
			activeRectangles.forEach((activeIndex) => {
				if (rectIndex !== activeIndex) {
					// Check for collision between rectangles
					if (
						isRectanglesOverlap(rectangles[rectIndex], rectangles[activeIndex])
					) {
						collisions.push([rectIndex, activeIndex]);
					}
				}
			});

			activeRectangles.add(rectIndex);
		} else {
			activeRectangles.delete(rectIndex);
		}
	});

	return collisions;
}

export function groupRectangles(
	rectangles: Array<number>,
	crossedPaths: Array<[number, number]>
) {
	// Create an adjacency list representing the graph
	const adjacencyList = new Map();

	crossedPaths.forEach(([rectIndex1, rectIndex2]) => {
		if (!adjacencyList.has(rectIndex1)) {
			adjacencyList.set(rectIndex1, []);
		}

		if (!adjacencyList.has(rectIndex2)) {
			adjacencyList.set(rectIndex2, []);
		}

		adjacencyList.get(rectIndex1).push(rectIndex2);
		adjacencyList.get(rectIndex2).push(rectIndex1);
	});

	// Perform depth-first search to find connected components
	const visited = new Set();
	const groups = [];

	function dfs(node: number, group: Array<number>) {
		visited.add(node);
		group.push(node);

		if (adjacencyList.has(node)) {
			for (const neighbor of adjacencyList.get(node)) {
				if (!visited.has(neighbor)) {
					dfs(neighbor, group);
				}
			}
		}
	}

	for (const rectangleIndex of rectangles) {
		if (!visited.has(rectangleIndex)) {
			const group: Array<number> = [];
			dfs(rectangleIndex, group);
			groups.push(group.sort());
		}
	}

	return groups;
}

export function cellStyle(rect: TRect): TRect {
	let width = 100;
	let left = 0;
	if (rect.width > 1) {
		const len = Math.floor(120 / rect.width);
		const spacing = (width - rect.width * len) / (rect.width - 1);
		left = rect.x * (len + spacing);
		width = len;
	}
	return {
		y: rect.y,
		height: rect.height,
		x: left,
		width,
	};
}
