"use server"

import fs from 'fs';
import html from 'remark-html';
import { redirect } from 'next/navigation'
import { remark } from 'remark';
import { removeSpaces, createNewNav } from './helper';

export const getSubject = async (fileName: string) => {
    const filePath = `assets/subjects/${fileName}.md`;
    const fileContents = fileName ? fs.readFileSync(filePath, 'utf8') : ""

    const processedContent = await remark().use(html).process(fileContents);
    const contentHtml = processedContent.toString();
    return contentHtml;
}

export const createSubject = async (formData: FormData) => {
    // collect a title for new subject
    // add information for subject
    const name = formData.get("name");
    const details = formData.get("details");

    // create a md file in directory
    const filePath = `assets/subjects/${removeSpaces(name)}.md`;
    const fileContent = details as string;

    fs.writeFile(filePath, fileContent, (err) => {
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

export const deleteSubject = async (subject) => {
    const filePath = `assets/subjects/${subject}.md`;

    // removeMd file
    fs.unlink(filePath, (error) => {
        if (error) {
            console.log("deleteSubject", error)
        }
        console.log('File deleted successfully!');
    })

    // run createNewNav
    createNewNav()

    // redirect to dashboard
    redirect("/study")
}

export const getSubjectData = async (subject) => {
    const filePath = `assets/subjects/${subject}.md`;
    const fileContents = subject ? fs.readFileSync(filePath, 'utf8') : ""

    return fileContents
}

export const editSubject = async (formData) => {
    const data = await formData
    const filePath = `assets/subjects/${data.name}.md`;
    const details = data.details;

    fs.writeFile(filePath, details, (err) => {
        if (err) {
          return console.error('editSubject Error writing file:', err);
        }
        console.log('editSubject Success: File saved successfully!');
    });
    
    // redirect to dashboard
    redirect(`/study/${data.name}`)
}

