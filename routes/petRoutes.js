const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

const express = require('express')
const router = express.Router()

let pets = [
    {
      id: 1,
      name: "Buddy",
      type: "dog",
      breed: "Golden Retriever",
      age: 3,
      description: "Friendly and energetic, loves to play fetch."
    },
    {
      id: 2,
      name: "Whiskers",
      type: "cat",
      breed: "Siamese",
      age: 2,
      description: "Curious and affectionate, enjoys sunbathing."
    },
    {
      id: 3,
      name: "Tweety",
      type: "bird",
      breed: "Canary",
      age: 1,
      description: "Chirpy and cheerful, loves to sing in the morning."
    },
    {
      id: 4,
      name: "Max",
      type: "dog",
      breed: "Bulldog",
      age: 4,
      description: "Loyal and calm, great with kids."
    },
    {
      id: 5,
      name: "Shadow",
      type: "cat",
      breed: "Maine Coon",
      age: 5,
      description: "Independent and intelligent, enjoys exploring."
    }
  ];

router.get('/', async(req, res) => {
    const pets = await prisma.Pet.findMany()
    res.json(pets)
})


 router.get('/:petId', async(req, res) => {
    const { petId } = req.params
    const existingPet = await prisma.Pet.findUnique({
        where: { id: parseInt(petId) },
      });

    if (existingPet) {
      res.json(existingPet)
    } else {
      res.status(404).send('Book not found')
    }
  })



router.post('/add', async(req, res) => {
    const {name, type, breed, age, description} = req.body
    const newPet = {
        name: name,
        type: type,
        breed: breed,
        age: age,
        description: description,
    }
    console.log(newPet)
    const newPetPris = await prisma.Pet.create({
        data: newPet
      })

    res.status(201).json(newPetPris)
  })

  router.put('/update/:petId', async(req, res) => {
    const { petId } = req.params
    const existingPet = await prisma.Pet.findUnique({
        where: { id: petId },
      });

    if(!existingPet) {
        res.status(404).send('Pet not found')
    }else{
        const updatedPet = await prisma.book.update({
            where: { id: parseInt(id) },
            data: {...pets[petIndex], ...updatedPetInfo
            }
          })
          res.status(201).json(updatedPet)
    }

  })

  router.delete('/delete/:petId', async(req, res) => {
    const { petId } = req.params

    try {
        const deletedBook = await prisma.Pet.delete({
          where: { id: parseInt(petId) }
        });
        // If the deletion is successful, return the deleted book
        res.status(204).send();
      } catch (error) {
        // If an error occurs, return a 500 status code with an error message
        res.status(404).send('Contact not found')
    }
  })

  module.exports = router
