const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("../configs/jwt.configs");

exports.create = (req, res) => {
  let hasedPassword = bcrypt.hashSync(req.body.password, 10);
  console.log("Je rentre dans le create");

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    password: hasedPassword,
    isAdmin: req.body.isAdmin || false,
  });
  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
          isAdmin: data.isAdmin,
          auth: true,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.send({
        token: userToken,
        auth: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || "Vous avez une erreur",
      });
    });
};
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "password not valid",
          auth: false,
          token: null,
        });
      } else {
        let userToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          configs.jwt.secret,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).send({
          auth: true,
          token: userToken,
          isAdmin: user.isAdmin,
        });
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.findOne = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: `Votre User id ${req.user.id} n'a pas été trouvé`,
        });
      }
      return res.send(user);
    })
    .catch((err) => res.send(err));
};

exports.getUserAll = (req, res) => {
  User.find()
    .then((Users) => {
      res.status(200).json(Users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updateUser = (req, res) => {
  console.log("Je suis req.user.id = ", req.user.id);
  console.log("Je suis req.query.id = ", req.query.id);

  if (req.user.isAdmin == true) {
    User.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    })
      .then((data) => {
        res.send({ user: data });
      })
      .catch((err) => res.status(500).json({ err: err }));
  } else {
    if (req.query.id == req.user.id) {
      console.log("Je rentre dans le else");
      User.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
      })
        .then((data) => {
          res.send({ user: data });
        })
        .catch((err) => res.status(500).json({ err: err }));
    }else{
      res.send({"err": "Not authorised"})
    }
  }
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: " User deleted successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.verifyAdmin = (req, res) => {
  if (req.user.isAdmin == true) {
    res.status(200).json({ admin: true });
  }
  if (req.user.isAdmin == false) {
    res.status(200).json({ admin: false });
  }
};

exports.verifyToken = (req, res) => {
  if (req.user) {
    res.status(200).json({ verify: true });
  }
};
