import { createPortal } from 'react-dom';

function Portal({ children, open }) {
	return open
		? createPortal(children, document.querySelector('#portal'))
		: null;
}

export default Portal;
