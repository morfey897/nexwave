import db, { schemas, orm } from '@/lib/storage';
import { TUID } from '@/types/common';

export interface IInvitation extends TUID {
	email: string;
	createdAt: Date;
	role: string;
	projectId: number;
}

/**
 * Get invitations
 * @param email - string
 * @param projectId - number
 * @returns
 */
export async function getInvitations({
	email,
	projectId,
}: {
	email?: string;
	projectId?: number;
}): Promise<Array<IInvitation>> {
	const response = await db
		.select({
			id: schemas.invitation.id,
			uuid: schemas.invitation.uuid,
			email: schemas.invitation.email,
			createdAt: schemas.invitation.createdAt,
			role: schemas.invitation.role,
			projectId: schemas.invitation.projectId,
		})
		.from(schemas.invitation)
		.where(
			orm.and(
				typeof email != 'undefined'
					? orm.eq(schemas.invitation.email, email)
					: undefined,
				typeof projectId != 'undefined'
					? orm.eq(schemas.invitation.projectId, projectId)
					: undefined,
			),
		)
		.execute();

	return response;
}

/**
 * Create invitation
 * @param email - string
 * @param projectId - number
 * @param role - string
 */
export async function createInvitation({
	email,
	projectId,
	role,
}: {
	email: string;
	projectId: number;
	role: string;
}): Promise<IInvitation | null> {
	const [invitation] = await db
		.insert(schemas.invitation)
		.values({
			email,
			projectId,
			role,
		})
		.returning({
			id: schemas.invitation.id,
			uuid: schemas.invitation.uuid,
			email: schemas.invitation.email,
			createdAt: schemas.invitation.createdAt,
			projectId: schemas.invitation.projectId,
			role: schemas.invitation.role,
		});

	return invitation;
}
