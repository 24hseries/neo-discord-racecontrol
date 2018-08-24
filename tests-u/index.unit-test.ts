import { suite, test } 	from "mocha-typescript";
import * as Moq			from "typemoq";
import { assert }		from "chai";

@suite
class AppCompontentTest {

	// private _testInstanceMock: Moq.IMock<AppComponent>;

	// private get testInstanceMock(): Moq.IMock<AppComponent> {
	// 	return this._testInstanceMock;
	// }

	// private get testInstance(): AppComponent {
	// 	return this.testInstanceMock.object;
	// }

	@test public Test() {
		const isTrue = true;
		assert.isTrue(isTrue);
	}
}
