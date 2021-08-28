module.exports = (sequelize, Sequelize) => {
    const Interview = sequelize.define("InterviewTb", {
        Interview_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      } ,
      Interviewed: {
        type: Sequelize.ENUM,
        values : ['NO', 'YES'],
        defaultValue : 'NO'
      },
      Interview_date: {
        type: Sequelize.DATEONLY
      },
      Interview_time: {
        type: Sequelize.STRING
      },
      Interview_body: {
        type: Sequelize.TEXT
      },
      Interview_status: {
        type: Sequelize.ENUM,
        values : ['PASSED', 'FAILLED', 'PENDING','SHORTLIST','CANCEL'],
        defaultValue : 'PENDING'
      },
      Company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'CompanyTbs',
          key: 'Company_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      User_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      }  
    });
  
    return Interview;
  };
   
