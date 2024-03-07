import { logged, loggableClass, loggableMethod } from './decorators/decorators';

@loggableClass()
class Decorated {
	public constructor() {
		console.log(`Decorated constructor called`);
	}

	@logged
	@loggableMethod('label')
	public methodDecorated(): void {
		console.log('Decorated method called');
	}
}

const decorated = new Decorated();
decorated.methodDecorated();
