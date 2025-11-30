import {createDataSet} from "./datasets";

async function testStart() {
    console.log((await createDataSet({u: 1000})).users.reduce((a, x) => a + x.passwordHash + "\", \"", '"'));
}

testStart();
