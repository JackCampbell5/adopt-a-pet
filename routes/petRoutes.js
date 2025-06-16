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

router.get('/', (req, res) => {
    res.json(pets)
 })


 router.get('/:petId', (req, res) => {
    const petId = parseInt(req.params.petId)
    const pet = pets.find(pet => pet.id === petId)

    if (pet) {
      res.json(pet)
    } else {
      res.status(404).send('Book not found')
    }
  })



router.post('/add', (req, res) => {
    const {name, type, breed, age, description} = req.body
    const newPet = {
        id: pets.length + 1,
        name: name,
        type: type,
        breed: breed,
        age: age,
        description: description,
    }

    pets.push(newPet)
    res.status(201).json(newPet)
  })

  router.put('/update/:petId', (req, res) => {
    const { petId } = req.params
    const petIndex = pets.findIndex(pet => pet.id === parseInt(petId))

    if (petIndex !== -1) {
      const updatedPetInfo = req.body
      pets[petIndex] = { ...pets[petIndex], ...updatedPetInfo }
      res.json(pets[petIndex])
    } else {
      res.status(404).send('Pet not found')
    }
  })

  router.delete('/delete/:petId', (req, res) => {
    const { petId } = req.params
    const initialLength = pets.length
    console.log(petId)
    pets = pets.filter(pets => pets.id !== parseInt(petId))

    if (pets.length < initialLength) {
      res.status(204).send()
    } else {
      res.status(404).send('Contact not found')
    }
  })

  module.exports = router
