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
  userName: {
    type: DataTypes.STRING(255),
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
  prepTime: {
    type: DataTypes.INTEGER,
  },
  cookTime: {
    type: DataTypes.INTEGER,
  },
  totalTime: {
    type: DataTypes.INTEGER,
  },
  serves: {
    type: DataTypes.INTEGER,
  },
  difficulty: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

// Recipe.sync({ force: false }).then(() => {
//   console.log('Recipe model synced');
// });
