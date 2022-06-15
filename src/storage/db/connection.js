/* eslint-disable global-require */
/* eslint-disable import/no-webpack-loader-syntax */
import { Connection } from 'jsstore';

const getWorkerPath = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js');
  }
  return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js');
};

const connection = new Connection(new Worker(getWorkerPath().default));
if (process.env.NODE_ENV !== 'production') {
  connection.logStatus = true;
}
export default connection;
