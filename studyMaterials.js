import { supabase } from "./supabaseClient"; // adjust the path

const studyMaterials = [
        {
            title: "Engineering Chemistry",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten Notes",
            downloadUrl: "https://drive.google.com/file/d/158UZh4asHuFcP9ykZJXB-SZGEos0I3Y0/view?usp=drive_link",
            fileType: "PDF"
        },
        {
            title: "Engineering physics",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            downloadUrl: "https://drive.google.com/file/d/1D7RaGErewmlp9EWMWRHoJSlR-SZ-d6cC/view?usp=drive_link",
            fileType: "ZIP"
        },
        {
            title: "Engineering Mathematics I",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            downloadUrl: "https://drive.google.com/file/d/1vKuzirOj8V0RpBQW4Prp8CgIFD3cwwzH/view?usp=drive_link",
            fileType: "PDF"
        },
        {
            title: "Engineering Mathematics II",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            downloadUrl:"https://drive.google.com/file/d/12JYsQzwepgABVWIXtn9Ay8wVI0Qb9WNP/view?usp=drive_link",
            fileType: "ZIP"
        },
        {
            title: "Programming for problem solving",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            downloadUrl: "https://drive.google.com/file/d/1pQUNULN9uuFoZzoyi_uhJ5yi3udhmTk3/view?usp=drive_link",
            fileType: "PDF"
        },
        {
            title: "soft-skills",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            
            downloadUrl: "https://drive.google.com/file/d/1oD6Ixrc_1NSB_VF1p61R0PQW4BtLbgW9/view?usp=drive_link",
            fileType: "ZIP"
        },
        {
            title: "environment and ecology",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            downloadUrl: "https://drive.google.com/file/d/1YxGGBbEjhTyblCHfXJc89SfC4Xv8sMg_/view?usp=drive_link",
            fileType: "ZIP"
        },
        {
            title: "fundamental of mechanical engg",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            downloadUrl: "https://drive.google.com/file/d/1F_QnHHASsMhoFO99ZbuLEpYMDiuIbxi8/view?usp=drive_link",
            fileType: "PDF"
        },
        {
            title: "fundamental of electrical engg",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            downloadUrl: "https://drive.google.com/file/d/1GA3nieKox9QsOEjprYhQWQNhDzFVElLN/view?usp=drive_link",
            fileType: "ZIP"
        },
        {
            title: "fundamental of electronics engg",
            description: "Get access to high-quality, syllabus-oriented notes for various subjects",
            imageUrl: "Handwritten notes",
            downloadUrl: "https://drive.google.com/file/d/1o4GFin-tGeZbvZoDAj93d2Af4XdGLrYP/view?usp=drive_link",
            fileType: "PDF"
        },


    ];

async function uploadStudyMaterials() {
  for (const material of studyMaterials) {
    const { error } = await supabase.from('first_year_notes').insert({
      title: material.title,
      description: material.description,
      image_url: material.imageUrl,
      download_url: material.downloadUrl,
      file_type: material.fileType
    });

    if (error) {
      console.error('Error inserting:', material.title, error.message);
    } else {
      console.log('Inserted:', material.title);
    }
  }
}

uploadStudyMaterials();
