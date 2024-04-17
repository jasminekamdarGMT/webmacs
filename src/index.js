import Main from './components/Main/Main';
import X600 from './helpers/X600/X600';

let x600 = new X600()
let React = require('react')
let ReactDOM = require('react-dom')

ReactDOM.render(<Main x600={x600} facilityConfig={window.facilityConfig} />, document.getElementById('main-container'))
