import Flutterwave from 'flutterwave-node-v3';
import ENV_VARS from './env';

const { FLW_PUBLIC_KEY, FLW_SECRET_KEY } = ENV_VARS;

export default new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);
