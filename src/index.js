import _ from 'lodash';

function render() {
  var el = document.createElement('div');
  el.innerText = _.join(['hello', 'webpack'], ' ');
  return el;
}

document.body.appendChild(render());
