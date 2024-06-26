import 'dotenv/config';
import { createDB } from '../src';

export const generateTestLogin = (prefix: string) =>
	`${prefix}test_${Math.random().toString(36).substring(7)}_jest@${process.env
		.DOMAIN!}`.toLowerCase();

export const whereTestLogin = (prefix: string) =>
	`${prefix}test_%_jest@${process.env.DOMAIN!}`.toLowerCase();

export const generateTestSlug = (prefix: string) =>
	`${prefix}-test-${Math.random()
		.toString(36)
		.substring(7)}-jest${prefix}`.toLowerCase();

export const whereTestSLug = (prefix: string) =>
	`${prefix}-test-%-jest${prefix}`.toLowerCase();

export const configDB = () =>
	createDB({ connectionString: process.env.POSTGRES_URL });

export const generateTestPassword = () => 'Test3Jest$';
