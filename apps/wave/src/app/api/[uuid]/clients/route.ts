import { NextRequest, NextResponse } from 'next/server';
import { IParams } from '~/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest, { params }: IParams) {
	console.log('REQUEST', params);
	return NextResponse.json({ status: 'success', data: [] });
}
