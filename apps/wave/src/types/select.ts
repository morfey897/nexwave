export interface ColorOptionSelect {
	value: string;
	label: string;
	color: string;
}

export interface CurrencyOptionSelect {
	value: string;
	label: string;
	IconComponent: React.ComponentType | null;
}

export interface EditViewSelect {
	label: string;
	value?: string;
	name?: string;
}

export interface EditViewCallendarSelect {
	label: string;
	value?: string;
}
