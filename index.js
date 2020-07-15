/*/

    1) When I click the element with the id of reset, any running timer should be
    stopped, the value within id="break-length" should return to 5, the value
    within id="session-length" should return to 25, and the element with
    id="time-left" should reset to it's default state.

/*/

let app = document.getElementById("app");

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

        //We need to bind this inside our handler to the component itself
        //We can also use arrow function behavior to do this, but it may 
        //have so side effect (re-rendering issues).
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }

    //Prototype methods => instances inherit from methods attached to the prototype props
    //(accessible via __proto__ props)

    //setState() method inherited from the React.Component() class

    increment(id) {
        let { default: count, onDefaultChange } = this.props;
        //I should not be able to set a session or break length to > 60
        if (count < 60) onDefaultChange(++count, id)
    }

    decrement(id) {
        let { default: count, onDefaultChange } = this.props;
        //onCountChange() => change the value of the count proprety in the local state parent
        //I should not be able to set a session or break length to <= 0
        if (count > 1) onDefaultChange(--count, id)
    }

    /*
        Event Handlers

        We pass event handlers as function in jsx.

            e.g:  <button onClick={handleClick}>

        
    */

    handleIncrement(id) {
        const { timerIsStarted } = this.props;
        //If the timer isn't alreay launched
        if (!timerIsStarted) this.increment(id);
    }

    handleDecrement(id) {
        const { timerIsStarted } = this.props;
        //If the timer isn't alreay launched
        if (!timerIsStarted) this.decrement(id);
    }

    //render() => called each time the view is updated
    render() {
        let { id, label, default: count } = this.props;
        //Our jsx syntax component => react element returned by React.createElement( type , props ,children)
        //=> object that describes our element

        //React element are immutable => don't be modified after its creation.
        //So we need to re-render our element each time there is a modification.
        //But a React core principle is that we don't have to update all the node tree 

        //Therfore, here we will only update modified nodes.
        let counter = (
            <div className="counter-wrapper">
                <label id={`${id}-label`} htmlFor="">{label}</label>
                <p id={`${id}-length`}>{count}</p>
                <button onClick={() => this.handleDecrement(id)} id={`${id}-decrement`}>count -</button>
                <button onClick={() => this.handleIncrement(id)} id={`${id}-increment`}>count +</button>
            </div>
        );

        //return our react element object
        return counter;
    }
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.handleStartPause = this.handleStartPause.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    //Lifecycle methods
    componentDidUpdate() {
        const { duration, onReachZero } = this.props;
        //When a session countdown reaches zero
        if (duration.minutes() === 0 && duration.seconds() === 0) {
            clearInterval(this.timerID);
            onReachZero();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //Handle methods

    handleStartPause() {
        this.props.onLaunchTimer();
    }

    handleReset() {
        clearInterval(this.timerID);
        this.setState({ isStarted: false });
        this.props.onReset();
    }

    render() {
        const { length, duration, label } = this.props;
        let timer = (
            <div className="timer-container">
                <div className="timer-wrapper">
                    <label id="timer-label">{label}</label>
                    <p id="time-left">{duration.minutes()}:{duration.seconds()}</p>
                </div>
                <button onClick={this.handleStartPause} id="start_stop">
                    Start/Stop
                </button>
                <button onClick={this.handleReset} id="reset">
                    Reset
                </button>
            </div>
        )

        return timer;
    }
}

/*
    * Lifting up state *
    * 
    * 
    In React => Share state => lifting up in the closest common ancestor.

    Here our App/ component would be the only "source of thruth".

*/

/**
 * Convert length in duration object with moment.js library
 * 
 * @param {number} length - the length to convert in duration.
 * @return {Object} the object duration from moment.js.
 */

function convertLengthToDuration(length) {
    return moment.duration(length, 'minutes');
}

const audioSrc = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

class App extends React.Component {

    constructor(props) {
        super(props);
        const { session, break: breakVal } = this.props;
        this.state = {
            label: 'session',
            sessionLength: session,
            breakLength: breakVal,
            duration: convertLengthToDuration(session),
            timerIsStarted: false
        };
        this.onDefaultChange = this.onDefaultChange.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onReachZero = this.onReachZero.bind(this);
        this.onLaunchTimer = this.onLaunchTimer.bind(this);
        this.tick = this.tick.bind(this);

        this.audio = React.createRef();
    }

    onDefaultChange(length, id) {
        if (id === 'break') this.setState({ breakLength: length });
        if (id === 'session') {
            this.setState({
                sessionLength: length,
                duration: convertLengthToDuration(length)
            });
        }
    }

    //Set duration to duration - 1s each tick. 
    tick() {
        const { duration } = this.state;
        //Each tick with substract 1 second
        this.setState({ duration: duration.subtract(1, 's') });
    }

    beep() {
        this.audio.current.play();
    }

    onLaunchTimer() {
        const { timerIsStarted } = this.state;

        if (!timerIsStarted) {
            this.setState({ timerIsStarted: true });
            //Launch the timer
            this.timerID = setInterval(this.tick, 1000);
        } else {
            this.setState({ timerIsStarted: false });
            //Stop the timer
            clearInterval(this.timerID);
        }
    }

    onReset() {
        //Stop and reset the audio element
        this.audio.current.pause();
        this.audio.current.currentTime = 0;
        //Stop the timer
        clearInterval(this.timerID);
        const { session, break: breakVal } = this.props;
        this.setState({
            sessionLength: session,
            break: breakVal,
            duration: convertLengthToDuration(session),
            timerIsStarted: false
        });
    }

    onReachZero() {
        this.beep()
        const { session, break: breakVal } = this.props;
        const { label } = this.state;
        if (label === 'session') {
            //We set the label to 'break' and init the duration to the break length
            this.setState({
                label: 'break',
                duration: convertLengthToDuration(breakVal)
            });
        }
        if (label === 'break') {
            //We set the label to 'session' and init the duration to the session length
            this.setState({
                label: 'session',
                duration: convertLengthToDuration(session)
            });
        }
    }

    render() {
        const { breakLength, sessionLength, duration, label, timerIsStarted } = this.state;
        const app = (
            <React.Fragment>
                <div className="time-btn-container">
                    <Counter
                        id={'break'}
                        default={breakLength}
                        onDefaultChange={this.onDefaultChange}
                        label={'Break Length'}
                        timerIsStarted={timerIsStarted}
                    />
                    <Counter
                        id={'session'}
                        default={sessionLength}
                        onDefaultChange={this.onDefaultChange}
                        label={'Session Length'}
                        timerIsStarted={timerIsStarted}
                    />
                </div>
                {/* this.audio => reference to the <audio/> element */}
                <audio id="beep" src={audioSrc} ref={this.audio}></audio>
                <Timer
                    label={label}
                    length={sessionLength}
                    duration={duration}
                    onDurationChange={this.onDurationChange}
                    onReset={this.onReset}
                    onReachZero={this.onReachZero}
                    onLaunchTimer={this.onLaunchTimer}
                />
            </ React.Fragment>
        );
        return app;
    }
}

ReactDOM.render(<App session={25} break={5} />, app);


