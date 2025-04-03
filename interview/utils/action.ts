"use server"

import fs from 'fs';
import { redirect } from 'next/navigation'
import { removeSpaces, createNewNav } from './helper';


export const createSubject = async (formData: FormData) => {
    // collect a title for new subject
    // add information for subject
    const name = formData.get("name");
    const details = formData.get("details");

    // create a md file in directory
    const filePath = `assets/subjects/${removeSpaces(name)}.md`;
    const fileContent = details as string;

    await fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          return console.error('createSubject Error writing file:', err);
        }
        console.log('createSubject Success: File saved successfully!');
    });

    // create a link in the dashboard left panel
    createNewNav()

    // redirect to new subject
    redirect(`/study/${removeSpaces(name)}`)

    // ToDo: create question and answer section
}