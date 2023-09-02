import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

export const createUser = asyncHandler(async (req,res) => {
    console.log("creating a user");

    let {email} = req.body;
        const userExists = await prisma.user.findUnique({where: {email: email}})
        if(!userExists){
            const user = await prisma.user.create({ data: req.body });
            res.send({
                message: "User registered successfully",
                user: user,
            })
        }
        else res.status(201).send({ message: 'User already registered' })
});

export const bookResidence = asyncHandler(async(req, res) => {
    const {email, date} = req.body
    const {id} = req.params
    
    try{

        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedFlats: true },
        })

        if(alreadyBooked.bookedFlats.some((visit) => visit.id === id)){
            res
                .status(400)
                .json({ message: "This residency is already booked by you"});
        }else {
            await prisma.user.update({
                where: { email: email},
                data: {
                    bookedFlats: { push: {id, date} },
                },
            });
            res.send("Your flat is booked successfully");
        }
    } catch (err){
        throw new Error(err.message)
    }
})

export const getAllBookings = asyncHandler(async (req, res) => {
    const {email} = req.body
    try{
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: {bookedFlats: true}
        })
        res.status(200).send(bookings)
    }catch(err){
        throw new Error(err.message);
    }
})

export const cancelBooking = asyncHandler(async(req, res) => {
    const {email} = req.body;
    const {id} = req.params

    try{

        const user = await prisma.user.findUnique({
            where: {email},
            select: {bookedFlats: true}
        })

        const index = user.bookedFlats.findIndex((visit)=>visit.id === id)

        if(index === -1){
            res.status(404).json({message: "Booking not found"})
        }else{
            user.bookedFlats.splice(index, 1)
            await prisma.user.update({
                where: {email},
                data: {
                    bookedFlats: user.bookedFlats
                }
            })

            res.send("Booking cancelled successfully");
        }
    }catch(err){
        throw new Error(err.message);
    }
})