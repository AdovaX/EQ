module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("ResourceTbs", {
        Resource_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      User_roles_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'UserRolesTbs',
          key: 'User_roles_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'CompanyTbs',
          key: 'Company_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Name: {
        type: Sequelize.STRING
      },
      Experience: {
        type: Sequelize.INTEGER
      },
      Email: {
        type: Sequelize.STRING
      },
      Who_filled: {
        type: Sequelize.ENUM,
        values : ['Yes','NO'],
        defaultValue : 'YES'
      },
      Summery: {
        type: Sequelize.TEXT
      },
      Masked: {
        type: Sequelize.INTEGER
      },
      Stack: {
        type: Sequelize.ENUM,
        values : ['FULL', 'FRONTEND', 'BACKEND', 'NULL'],
        defaultValue : 'NULL'
      },
      Status: {
        type: Sequelize.ENUM,
        values : ['VERIFIED', 'PENDIG', 'UNVERIFIED'],
        defaultValue : 'PENDIG'
      },
      Is_remote: {
        type: Sequelize.ENUM,
        values : ['YES', 'NO', 'BOTH'],
        defaultValue : 'BOTH'
      },
      Rate: {
        type: Sequelize.DOUBLE
      },
      Availability_status: {
        type: Sequelize.ENUM,
        values : ['FULL', 'HALF', 'BUSY'],
        defaultValue : 'FULL'
      },
      User_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      } ,
      Resume: {
        type: Sequelize.STRING
      },
      Intro_video: {
        type: Sequelize.STRING
      }
    });
  
    return Resource;
  };
  

