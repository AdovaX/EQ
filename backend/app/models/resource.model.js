module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("ResourceTbs", {
        Resource_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      Resource_name: {
        type: Sequelize.STRING
      },
      Resource_Experience: {
        type: Sequelize.INTEGER
      },
      Resource_Email: {
        type: Sequelize.STRING,
        unique: true
      }, 
      Resource_phone: {
        type: Sequelize.STRING
      },
      Resource_Password: {
        type: Sequelize.STRING
      }, 
      Resource_Designation: {
        type: Sequelize.STRING
      }, 
      Resource_summery: {
        type: Sequelize.TEXT
      },
      Resource_masked: {
        type: Sequelize.ENUM,
        values : ['YES', 'NO'],
        defaultValue : 'NO'
      },
      Resource_active: {
        type: Sequelize.INTEGER,
        defaultValue : 1
      },
      Resource_stack: {
        type: Sequelize.ENUM,
        values : ['FULL', 'FRONTEND', 'BACKEND', 'OTHERS'],
        defaultValue : 'OTHERS'
      },
      Resource_status: {
        type: Sequelize.ENUM,
        values : ['AVAILABLE', 'SHORTLISTED', 'INTERVIEWING','ASSIGNED'],
        defaultValue : 'AVAILABLE'
      },
      Is_remote: {
        type: Sequelize.ENUM,
        values : ['YES', 'NO', 'BOTH'],
        defaultValue : 'BOTH'
      },
      Resource_rate: {
        type: Sequelize.DOUBLE
      },
      Available_from: {
        type: Sequelize.DATEONLY
      },
      Available_to: {
        type: Sequelize.DATEONLY
      },
      Availability_status: {
        type: Sequelize.ENUM,
        values : ['FULL', 'HALF', 'BUSY'],
        defaultValue : 'FULL'
      }, 
      Resource_resume: {
        type: Sequelize.STRING
      },
      Intro_video: {
        type: Sequelize.STRING
      },
      Resource_photo: {
        type: Sequelize.TEXT
      },
      Created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'UsersTbs',
          key: 'User_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      } ,
    });
  
    return Resource;
  };
  

