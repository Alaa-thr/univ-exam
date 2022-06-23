import { IAdmin } from 'admins/interface/admin.interface';
import { Person } from 'shared';
import { Entity } from 'typeorm';

@Entity('admins')
export class AdminEntity extends Person implements IAdmin {}
