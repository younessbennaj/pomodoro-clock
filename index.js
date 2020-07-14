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

        /*
            * Local state * 
            * 
            
            => private and totally controled by the component

            We want that our component act as pure function with their props. props
            mutation are not allowed. Thus, we need to use a local state to work with
            some values without modifying inital props. We store this local state in 
            a .state proprety. This proprety will be acessible in our component. 

            We can asign the local state only in the contructor() method.

            We can't modidy directly the local state, we must use this.setState() 
            method.
        
        */

        this.state = {
            count: this.props.default
        };

        //We need to bind this inside our handler to the component itself
        //We can also use arrow function behavior to do this, but it may 
        //have so side effect (re-rendering issues).
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }

    /*

        Component Lifecycle 
    
    */

    //After rendering (DOM available)
    componentDidMount() {
        //use arrow function to pass context inside the increment method
        //setTimeout(() => this.increment(), 4000);
    }

    //Prototype methods => instances inherit from methods attached to the prototype props
    //(accessible via __proto__ props)

    //setState() method inherited from the React.Component() class

    increment() {
        //destructuring => no mutation of this.state
        let { count } = this.state;
        this.setState({
            count: ++count
        })
    }

    decrement() {
        let { count } = this.state;
        this.setState({
            count: --count
        })
    }

    /*
        Event Handlers

        We pass event handlers as function in jsx.

            e.g:  <button onClick={handleClick}>

        
    */

    handleIncrement() {
        this.increment();
    }

    handleDecrement() {
        this.decrement();
    }

    //render() => called each time the view is updated
    render() {

        let { id, label } = this.props;
        //Our jsx syntax component => react element returned by React.createElement( type , props ,children)
        //=> object that describes our element

        //React element are immutable => don't be modified after its creation.
        //So we need to re-render our element each time there is a modification.
        //But a React core principle is that we don't have to update all the node tree 

        //Therfore, here we will only update modified nodes.
        let counter = (
            <div className="counter-wrapper">
                <label id={`${id}-label`} htmlFor="">{label}</label>
                <p id={`${id}-length`}>{this.state.count}</p>
                <button onClick={this.handleDecrement} id={`${id}-decrement`}>count -</button>
                <button onClick={this.handleIncrement} id={`${id}-increment`}>count +</button>
            </div>
        );

        //return our react element object
        return counter;
    }
}

let counter = <Counter start={25} label={'Counter'} />;

function App(props) {
    const app = (
        <div className="time-btn-container">
            <Counter id={'break'} default={5} label={'Counter'} />
            <Counter id={'session'} default={25} label={'Counter'} />
        </div>
    );
    return app;
}

ReactDOM.render(<App />, app);


