import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children, open }) {
	const portalRef = useRef();
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		portalRef.current = document.querySelector('#portal');
		setMounted(true);
	}, []);

	return open && mounted && portalRef.current
		? createPortal(children, portalRef.current)
		: null;
}

export default Portal;
