import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { db } from '../db';

export const Category = db.define('category', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
});

// Category.sync({ force: false }).then(() => {
//   console.log('Category model synced');
// });
