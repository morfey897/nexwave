'use client';
import { useNWStore } from '@/hooks/store';

function ProjectName({ name }: { name: string }) {
	const project = useNWStore((state) => state.project);
	return project?.name || name;
}

export default ProjectName;
