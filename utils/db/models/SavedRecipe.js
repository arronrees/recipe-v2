import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { db } from '../db';

export const SavedRecipe = db.define('savedRecipe', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
  },
  recipeId: {
    type: UUID,
  },
});

// SavedRecipe.sync({ force: false }).then(() => {
//   console.log('SavedRecipe model synced');
// });
