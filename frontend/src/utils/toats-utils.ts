import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

let options: any = {
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
};

/**
 * Toast component
 * @param {obj} opt option containing messgae and type
 */
export const Toast = (opt: any) => {
	opt.type === 'error' ? toast.error(opt.message, options) : toast.success(opt.message, options);
};

// To use, import { Toast } from '../../helpers/toastify.helpers';
// and call Toast
// e.g onClick={() =>
//   Toast({
// 	message:
// 	'An email has been sent that contains a link to reset your password',
// 	type: 'success',
//   })
// }
