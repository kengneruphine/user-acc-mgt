import { Types } from 'mongoose';

export default (id) => new Types.ObjectId(id).toString() === id;
