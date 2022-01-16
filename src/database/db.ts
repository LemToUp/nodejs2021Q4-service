import { createConnection } from 'typeorm';
import config from './ormconfig';

export const getConnection = () => createConnection(config);
