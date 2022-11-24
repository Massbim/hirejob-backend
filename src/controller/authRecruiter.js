const common = require("../helper/common");
const { authModel } = require("../models/authRecruiter");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { v4: uuid4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");

const authRecruiter = {
  loginRecruiter: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await authModel.findEmail(email);
      console.log(user);
      if (!user) {
        return res.json({
          message: "email yang anda masukan salah",
        });
      }
      const invalidPassword = bcrypt.compareSync(password, user.password);
      if (!invalidPassword) {
        return res.json({
          message: "password yang anda masukan salah",
        });
      }
      delete user.password;
      const payload = {
        email: user.email,
        id: user.id,
        fullname: user.fullname,
        phonenumber: user.phonenumber,
        company: user.company,
        position: user.position,
        role: user.role,
      };
      user.token = authHelper.generateToken(payload);
      const newRefreshToken = await authHelper.generateRefreshToken(payload);
      const data = {
        email,
        id: user.id,
        fullname: user.fullname,
        phonenumber: user.phonenumber,
        company: user.company,
        position: user.position,
        role: user.role,
        token: user.token,
        refreshToken: newRefreshToken,
      };
      common.response(res, data, "Login berhasil", 200);
    } catch (err) {
      console.log(err);
      next(createError);
    }
  },

  registerRecruiter: async (req, res, next) => {
    try {
      const { fullname, password, email, company, phonenumber, position } =
        req.body;
      console.log(password);
      const salt = bcrypt.genSaltSync(10);
      console.log(salt);
      const passwordHash = bcrypt.hashSync(password, salt);
      const role = "recruiter";
      const data = {
        id: uuid4(),
        email,
        password: passwordHash,
        fullname,
        company,
        phonenumber,
        position,
        role,
      };
      console.log(data);
      const { rowCount } = await authModel.findEmail(email);
      if (rowCount) {
        return common.response(res, rowCount, "user sudah terdaftar", 403);
      } else {
        await authModel.create(data);
        common.response(
          res,
          {
            id: uuid4(),
            email,
            fullname,
            company,
            phonenumber,
            position,
            role,
          },
          "resgister Success",
          201
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  profil: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      const {
        rows: [user],
      } = await authModel.findEmail(decoded.email);
      console.log(user);
      delete user.password;
      common.response(res, user, `Profile ${user.fullname}`, 200);
    } catch (error) {
      console.log(error);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const id = req.decoded.id;
      console.log(req.decoded);
      const {
        // fullname,
        company_field,
        address,
        company_description,
        email,
        instagram,
        linkedin,
        phonenumber,
        company,
      } = req.body;
      console.log(address);
      console.log(req.file);
      const picture = req.file.filename;
      console.log(picture);
      const data = {
        company_field,
        address,
        company_description,
        email,
        image: `http://localhost:5500/img/${picture}`,
        instagram,
        linkedin,
        phonenumber,
        company,
      };
      console.log(data);
      authModel
        .updateProfile({ ...data, id })
        .then(() => {
          common.response(res, data, "Updated Profile", 200);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.body.refreshToken;
      const decoded = await jwt.verify(refreshToken, process.env.SECRET_KEY);
      console.log(decoded);
      const newPayload = {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      };

      const newToken = await authHelper.generateToken(newPayload);
      const newRefreshToken = await authHelper.generateRefreshToken(newPayload);
      const result = {
        token: newToken,
        refreshToken: newRefreshToken,
      };
      common.response(res, result, "Token berhasil di refres", 200);
    } catch (error) {
      console.log(error);
      if (error && error.name === "TokenExpiredError") {
        next(createError(400, "token invalid"));
      } else if (error && error.name === "JsonWebTokenError") {
        next(createError(400, "token invalid"));
      } else {
        next(createError(400, "token not active"));
      }
    }
  },
  changePassword: (req, res, next) => {
    console.log(req.body);
    authModel
      .changePassword(req.body)
      .then(() => {
        res.json({
          message: "Password updated",
        });
      })
      .catch((_error) => {
        next(createError);
      });
  },
};

module.exports = {
  authRecruiter,
};
