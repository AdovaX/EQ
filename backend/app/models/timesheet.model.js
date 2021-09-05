module.exports = (sequelize, Sequelize) => {
    const TimesheetTbs = sequelize.define("TimesheetTbs", {
        Timesheet_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      }, 
      Project_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'ProjectsTbs',
          key: 'Project_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      } ,
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
      User_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      Working_date: {
        type: Sequelize.DATEONLY
      },
      Working_hours: {
        type: Sequelize.STRING
      },
      Comments: {
        type: Sequelize.STRING
      },
      Resource_performance: {
        type: Sequelize.STRING
      },
      Feedback: {
        type: Sequelize.TEXT
      },
      Status: { 
        type: Sequelize.ENUM,
        values : ['Approved', 'Rejected','Pending'],
        defaultValue: 'Pending'
      },
      Resource_approvel: { 
        type: Sequelize.ENUM,
        values : ['Approved','Pending'],
        defaultValue: 'Pending'
      },
      Rejection_reson: {
        type: Sequelize.TEXT
      },
    });
  
    return TimesheetTbs;
  };