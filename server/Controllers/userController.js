const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// token 생성
const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: '3d' });
};

// 사용자 등록
const registerUser = async (req, res) => {
  try {
    const { name, id, password } = req.body;

    let user = await userModel.findOne({ id });

    if (user) return res.status(400).json('동일한 아이디가 존재합니다.');
    if (!name || !id || !password) return res.status(400).json('모든 항목을 입력해주세요.');

    user = new userModel({ name, id, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, id, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// 사용자 로그인
const loginUser = async (req, res) => {
  const { id, password } = req.body;

  try {
    let user = await userModel.findOne({ id });
    if (!user) return res.status(400).json('올바르지 않은 아이디 혹은 비밀번호입니다.');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json('옳지 않은 아이디 혹은 비밀번호입니다.');

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.name, id, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// 특정 사용자 찾기
const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// 모든 사용자 찾기
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers };
