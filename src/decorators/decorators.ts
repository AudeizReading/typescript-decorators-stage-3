export type Constructor = { new (...args: any[]): NonNullable<unknown> };
export type ConstructorParams<T extends Constructor> = ConstructorParameters<T>;
export type Context = {
	kind: string;
	name: string | symbol;
	access: {
		get?(): unknown;
		set?(value: unknown): void;
		has?(value: unknown): boolean;
	};
	private?: boolean;
	static?: boolean;
	addInitializer?(initializer: () => void): void;
};

export type ClassDecorator = <T extends Constructor>(target: T, context: Context) => T | void;

export type Method = (...args: any[]) => any;

export function loggableClass(): any {
	return function <T extends Constructor>(constructor: T, context: Context): T {
		return class extends constructor {
			public constructor(...args: any[]) {
				super(...args);
				console.log(
					`Constructor ${constructor.name} has been decorated. It a ${String(context.name)}`,
					context,
				);
			}
		};
	};
}

export function loggableMethod(label: string): Method {
	return <T extends Method>(value: T, context: Context): Method => {
		return function (this: any, ...args: any[]): T {
			console.log(`Method ${value.name} has been decorated`, context, args, label);
			return value.call(this, ...args) as unknown as T;
		};
	};
}

export function logged(original: any, context: any): any {
	function replacementMethod(this: any, ...args: any[]): any {
		console.log('LOG: Entering method.', context);
		const result = original.call(this, ...args);
		console.log('LOG: Exiting method.');
		return result;
	}
	return replacementMethod;
}
