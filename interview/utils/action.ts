"use server"
import prisma from "@/utils/db"
import { redirect } from 'next/navigation'

// Prisma Chat
export const getAllChats = async () => {
    return await prisma.chat.findMany()
}

export const getChat = async (id) => {
    return await prisma.chat.findUnique({
        where: {
            id
        }
    })
}

export const saveChat = async (chat) => {
    await prisma.chat.create({
        data: {
            chat
        }
    })
}

export const deleteChat = async (id) => {
    await prisma.chat.delete({
        where: {
            id
        }
    })
    redirect("/archive")
}

// Prisma Subject
export const getAllSubjects = async () => await prisma.subject.findMany();

export const createSubject = async (formData: FormData) => {
    const name = formData.get("name");
    const details = formData.get("details");

    return await prisma.subject.create({
        data: {
            name,
            details
        }
    })
}