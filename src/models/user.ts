import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

enum UserRole {
  Manufacturer = 'Manufacturer',
  Regulator = 'Regulator',
  Retailer = 'Retailer'
}

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public role!: UserRole;

  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(...Object.values(UserRole)),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeCreate: async (user: User) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user: User) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

export default User;
