import db from '@/lib/storage';
import { schemas, orm } from '@nw/storage';
import { TUID } from '@/types/common';

export interface IEvent extends TUID {
	createdAt: Date;
	name: string;
	info: string | null;
	color: string | null;
	startAt: Date;
	endAt: Date | null;
	duration: number;
}

/**
 * Create event
 * @param email - string
 * @param projectId - number
 * @param role - string
 */
export async function createEvent({
	email,
	projectId,
	role,
}: {
	email: string;
	projectId: number;
	role: string;
}): Promise<IEvent | null> {
	return null;
	// const [invitation] = await db
	// 	.insert(schemas.invitation)
	// 	.values({
	// 		email,
	// 		projectId,
	// 		role,
	// 	})
	// 	.returning({
	// 		id: schemas.invitation.id,
	// 		uuid: schemas.invitation.uuid,
	// 		email: schemas.invitation.email,
	// 		createdAt: schemas.invitation.createdAt,
	// 		projectId: schemas.invitation.projectId,
	// 		role: schemas.invitation.role,
	// 	});

	// return invitation;
}
