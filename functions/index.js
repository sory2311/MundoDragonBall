const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const express = require("express");
const cors = require("cors");
const router = express();
router.use(cors({ origin: true }));
router.get("/personajes/:personaje", async (req, res) => {
  const personaje = await admin
    .firestore()
    .collection("personajes")
    .doc(req.params.personaje)
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
        return {};
      }
    });
  res.send(personaje);
});
router.get("/personajes/:id", async (req, res) => {
  const personajes = await admin
    .firestore()
    .collection("personajes")
    .doc(req.params.id)
    .get()
    .then(function(doc){
      if(doc.exists){
        return doc.data();
      }else{
        console.log("No se encontró documento");
      }
    }).catch(function(error){
      console.log("Error buscando documento", error);
    })
  res.send(personajes);
});
router.post("/personaje", async (req, res) => {
  const personaje = await admin
    .firestore()
    .collection("personajes")
    .doc(req.body.email)
    .set(req.body.favoritos)
    .then(() => {
      console.log("Todo nice");
    });
  res.send(personaje);
});
router.put("/personaje/:id", async (req, res) => {
  const personaje = await admin
    .firestore()
    .collection("personajes")
    .doc(req.params.id)
    .update(req.body)
    .then(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
        return {};
      }
    });
  res.send(personaje);
});
router.delete("/personaje/:id", async (req, res) => {
  const personaje = await admin
    .firestore()
    .collection("personajes")
    .doc(req.params.id)
    .delete();
  res.send(personaje);
});
exports.personajes = functions.https.onRequest(router);