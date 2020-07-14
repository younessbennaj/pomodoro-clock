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


let test = () => {
    //console.log({new Date().toLocaleTimeString()});
}

class Counter extends React.Component {

    constructor(props) {
        /*
            * super() *
            * 
                super() calls the contructor() method of the parent class React.Component
                thanks to this, our Counter() class instance inherit from the attributes
                of the React.Component() class (context, refs, props,...).
                Without this super() method call, we can't use 'this' as a reference to the
                Counter() class instance.
            
        */
        super(props);
        console.log(this);
    }

    //Prototype methods => instance inherit from this (accessible via __proto__ props)

    render() {

        //Our jsx syntax component => react element returned by React.createElement( type , props ,children)
        //=> object that describes our element
        let counter = (
            <div className="counter-wrapper">
                <label id="label" htmlFor="">counter</label>
                <p id="length">0</p>
                <button id="increment">count -</button>
                <button id="decrement">count +</button>
            </div>
        );

        //return our react element object
        return counter;
    }
}

let counter = new Counter({ count: 0 });


// function App(props) {
//     const app = <Counter count={0} />;
//     return app;
// }


// ReactDOM.render(<App />, app);


