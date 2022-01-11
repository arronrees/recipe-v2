import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { db } from '../db';

export const RecipeCategory = db.define('recipeCategory', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  categoryId: {
    type: DataTypes.UUID,
  },
  recipeId: {
    type: DataTypes.UUID,
  },
});

RecipeCategory.sync({ force: false }).then(() => {
  console.log('RecipeCategory model synced');
});
