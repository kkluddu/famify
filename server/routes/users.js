import express from "express"
import bodyParser from "body-parser"

// use to check for authentication
import userAuthenticated from "../auth/Authentication.js";

// models
import Family from "../models/Family.model.js";
import User from "../models/User.model.js"

const userRoutes = express.Router();

userRoutes.use(bodyParser.urlencoded({
  extended: true
}));

// get current user
userRoutes.route("/user")
    .get(userAuthenticated, (req, res) => {
      return res.send(req.session.user);
  });

// get family
userRoutes.route("/user/family")
  .get(userAuthenticated, (req, res) => {

    Family.findById(req.session.user.familyID, (err, family) => {
      if (err) return res.status(500).send("An error occured.")
      if (!family) return res.send("No family found.")
      res.send(family)
    })
});

// get one user by id
userRoutes.route("/user/:id")

  // get one user
  .get(userAuthenticated, (req, res) => {
    
    const familyID = req.session.user.familyID

    // find ID in family
    Family.findById(familyID, (err, family) => {

      if (err) return res.send("An error occured.")
      if (!family) return res.send("Not found.")

      // if member being searched is in the same family
      if (family.members.some(i => i.toString() === req.params.id.toString())) {

        User.findById(req.params.id, (err, user) => {

          if (err) return res.send("An error occured.")
          if (!user) {
            return res.status(404).send({
              status: 404,
              message: "User not found."
            })
          }

          return res.send(user)

        })

      } else {
        return res.status(404).send({
          status: 404,
          message: "User not found."
        })
      }
    })

  })

export default userRoutes;
