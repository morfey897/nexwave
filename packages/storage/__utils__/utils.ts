import 'dotenv/config';
import { createDB } from '../src';

export const generateTestEmail = (prefix:string) =>
	`${prefix}test_${Math.random().toString(36).substring(7)}_jest@${process.env.DOMAIN!}`;

export const whereTestEmail = (prefix:string) => `${prefix}test_%_jest@${process.env.DOMAIN!}`;

export const generateTestSlug = (prefix:string) =>
	`${prefix}-test-${Math.random().toString(36).substring(7)}-jest${prefix}`;

export const whereTestSLug = (prefix:string) => `${prefix}-test-%-jest${prefix}`;

export const configDB = () => createDB({ connectionString: process.env.POSTGRES_URL });

