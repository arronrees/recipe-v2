import { DataTypes, UUID, UUIDV4 } from 'sequelize';

import { db } from '../db';

// user db model
export const User = db.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },
  // profilePicture,
});

User.sync({ force: false }).then(() => {
  console.log('User model synced');
});
