module.exports = (sequelize, Sequelize) => {
    const AuditTrailTb = sequelize.define("AuditTrailTbs", {
        Audit_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Audit_table: {
        type: Sequelize.STRING, 
      },
      Audit_column: {
        type: Sequelize.STRING, 
      },
      Audit_pre_value: {
        type: Sequelize.STRING, 
      },
      Audit_new_value: {
        type: Sequelize.STRING, 
      },
      Audit_owner: {
        type: Sequelize.STRING, 
      },
      Audit_ip: {
        type: Sequelize.STRING, 
      } 
    });
  
    return AuditTrailTb;
  };
     