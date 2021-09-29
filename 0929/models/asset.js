const { Assets } = require(".")

module.exports = (sequelize,DataTypes)=>{
    const Assets = sequelize.define('assets',{
        input:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        output:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        regDate:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },{
        timestamps:false,
        userscored:false,
        paranoid:false,
        modelName:'user',
        tableName:'user',
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci',
    })

    Assets.associate= (models)=>{
        Assets.belongsTo(models.User,{
            onDelete:'cascade',
            foreignKey:{
                allowNull:true
            }
        })
    }
    return Assets
}
   