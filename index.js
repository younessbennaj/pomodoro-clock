/*/

    1) When I click the element with the id of reset, any running timer should be
    stopped, the value within id="break-length" should return to 5, the value
    within id="session-length" should return to 25, and the element with
    id="time-left" should reset to it's default state.

    2) When I click the element with the id of break-decrement, the value within
    id="break-length" decrements by a value of 1, and I can see the updated value.

    3) break-increment => id="break-length" + 1

    4) session-decrement => id="session-length" - 1

    5) session-increment => id="session-length" + 1

    6) I should not be able to set a session or break length to <= 0.

    7) I should not be able to set a session or break length to > 60.
/*/

let app = document.getElementById("app");

const counter = (
    <div className="counter-wrapper">
        <label id="label" htmlFor="">counter</label>
        <p id="length">0</p>
        <button id="increment">break -</button>
        <button id="decrement">break +</button>
    </div>
);

let test = () => {
    console.log(this);
}

ReactDOM.render(counter, app);

