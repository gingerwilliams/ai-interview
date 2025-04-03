import fs from 'fs';

export const removeSpaces = (name) => {
    const newName = name.split(" ").join("-")
    return newName;
}

export const createNewNav = async () => {
    // search inside directory
    const dirPath = "assets/subjects/"
    fs.readdir(dirPath, (error, files) => {
        if (error) {
            return console.error("createNewNav readdir Error writing file:", error);
        }

        const nav = files.map(file => {
            console.log("dirPath: ", file)
            const name = file.split(".")[0]
            return {
                name: name,
                href: `/study/${name}`,
                icon: "/assets/icons/study.svg"
            }
        })

        fs.writeFile("assets/data/nav.json", JSON.stringify(nav), (error) => {
            if (error) {
                console.log("createNewNav write:", error)
            }
        })
    })

    


    
}