// organize command function implementation

let fs = require("fs");
let path = require("path");


let types = {
    media: ["mp4", "mkv", "jpeg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
  }


function organizeFn(dirPath)
{
    let destPath;
    // 1. input -> directory path given
    if(dirPath==undefined) // not filled directory path
    {
        destPath=process.cwd();
    }
    else{
        let isPresent= fs.existsSync(dirPath);
        if(isPresent==false)
        { 
            console.log("Enter valid Path of Directory");
        }
        else{
                // till this point we have only covered edge cases 
                // now here we have correct directory path which is present 
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // 2. create -> organized_files  (directory)
                destPath=path.join(dirPath, "organized_files"); 
                if(fs.existsSync(destPath)==false)
                {
                     fs.mkdirSync(destPath);
                }
                // else its already been there which meanes we have already run command one time so its already there.
                organize_helper(dirPath, destPath); //function call
        }
        
    }
}

    function organize_helper(src, dest)
    {

    // 3. identify categories of all the files present in that input directory  ->
    let childNames = fs.readdirSync(src);
       for(let i=0; i<childNames.length; i++)
       {
          let childPath=path.join(src, childNames[i]); // childPath stores the path of this file/folder
          let isFile= fs.lstatSync(childPath).isFile();
          if(isFile)
          {
              // 4. get category of this file
             let category_name= getCategory(childNames[i]); // function call
             console.log(childNames[i], "belongs to --> ", category_name);
             // 5. copy / cut  files to that organized directory inside of any of category folder
             copyAndCut_files(childPath, dest, category_name); // function call

          }
       }

    
    }

    function copyAndCut_files(filePath, dest, category)
    {
        // copy file from src to folder name "category" inside dest
        let categoryPath= path.join(dest, category);
        if(fs.existsSync(categoryPath)==false) // if its for the first time for this category
        {
            fs.mkdirSync(categoryPath);
        }
            let file_name = path.basename(filePath);
            let final_filePath = path.join(categoryPath, file_name);  // making new file (with same file name ) in category_name follder of dest dir

            fs.copyFileSync(filePath, final_filePath); //copying contents of file in new file 
            fs.unlinkSync(filePath); // deleting/cut file from current/src directory 
       



    }

    function getCategory(name)
    {
        let ext=path.extname(name);
        ext = ext.slice(1); // to remove " . " from starting of exetension name 
       
        
        
        for(let type in types)
        {
            let type_name=types[type];
            for(let i=0; i<type_name.length; i++)
            {
            
                if(ext==type_name[i])
                {
                    return type;
                }
            }
        }
        return "others";

    }

    module.exports = {
        organizeKey : organizeFn
      }



