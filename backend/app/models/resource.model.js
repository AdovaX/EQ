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
        values : ['VERIFIED', 'PENDING', 'NONVERIFIED'],
        defaultValue : 'PENDING'
      },
      Is_remote: {
        type: Sequelize.ENUM,
        values : ['YES', 'NO', 'BOTH'],
        defaultValue : 'BOTH'
      },
      Resource_rate: {
        type: Sequelize.DOUBLE
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
      }
    });
  
    return Resource;
  };
  

