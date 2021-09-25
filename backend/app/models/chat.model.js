module.exports = (sequelize, Sequelize) => {
    const ChatTbs = sequelize.define("ChatTbs", {
        Chat_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      Message: {
        type: Sequelize.TEXT
      },
      Sender_seen: {
        type: Sequelize.INTEGER,        
        defaultValue : 1 
      },
      Reciver_seen: {
        type: Sequelize.INTEGER,
        defaultValue : 1 
      },
      Sender_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Reciver_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      Requirement_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'RequirementsTbs',
          key: 'Requirement_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      }, 
      Resource_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'ResourceTbs',
          key: 'Resource_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      }
    });
  
    return ChatTbs;
  };
   
    