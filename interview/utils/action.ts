"use server"
import prisma from "@/utils/db"
import { redirect } from 'next/navigation'

// Prisma Chat
export const getAllChats = async () => {
    return await prisma.chat.findMany()
}

export const getChat = async (id: string) => {
    return await prisma.chat.findUnique({
        where: {
            id
        }
    })
}

export const saveChat = async (chat: string) => {
    await prisma.chat.create({
        data: {
            chat
        }
    })
}

export const deleteChat = async (id: string) => {
    await prisma.chat.delete({
        where: {
            id
        }
    })
    redirect("/archive")
}

// Prisma Subject
export const getAllSubjects = async () => await prisma.subject.findMany();

export const getSubject = async (id: string) => {
    return await prisma.subject.findUnique({
        where: {
            id
        }
    })
}

export const createSubject = async (formData) => {
    const name = formData.get("name");
    const details = formData.get("details");

    await prisma.subject.create({
        data: {
            name,
            details
        }
    })
}