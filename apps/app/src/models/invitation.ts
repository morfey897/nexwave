import db, { schemas, orm } from '@/lib/storage';
import { TUID } from '@/types/common';

export interface IInvitation extends TUID {
	email: string;
	createdAt: Date;
	//TODO: add project
}

/**
 * Has invitation by email
 * @param param
 * @returns 
 */
export async function hasInvitation({ email }: { email: string }):Promise<boolean> {
	const list = await db
		.select({
			id: schemas.invitation.id,
			uuid: schemas.invitation.uuid,
			email: schemas.invitation.email,
			createdAt: schemas.invitation.createdAt,
		})
		.from(schemas.invitation)
		.where(orm.eq(schemas.invitation.email, email))
		.limit(1);

	return list && list.length > 0;
}
