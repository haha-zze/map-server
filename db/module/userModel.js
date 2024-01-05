const mongoose = require('mongoose');

// 定义数据库模型
const userSchema = new mongoose.Schema({
  username:{
      type:String,
      require:true,
      unique:true
  },
  password: {
      type:String,
      require:true
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
