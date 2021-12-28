import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { db } from '../db';

export const Recipe = db.define('recipe', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Recipe.sync({ alter: true }).then(() => {
  console.log('Recipe model synced');
});
