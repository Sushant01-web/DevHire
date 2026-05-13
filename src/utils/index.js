/* This file will contains all formcontrols */
import qs from 'query-string'

export const initialRecruiterFormData = {
    name: "",
    companyName: "",
    companyRole: "",
};


// Formdata for recruiter
export const recruiterOnBoardFormControls = [
    {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name',
        componentType: 'input',
    },
    {
        label: 'Current Company',
        name: 'companyName',
        placeholder: 'Enter your company name',
        componentType: 'input',
    },
    {
        label: 'Company Role',
        name: 'companyRole',
        placeholder: 'Enter your current role',
        componentType: 'input',
    },
]


// Initial Formdata for candidate
export const initialCandidateFormData = {
    resume: "",
    name: "",
    currentJobLocation: "",
    preferedJobLocation: "",
    currentSalary: "",
    noticePeriod: "",
    skills: "",
    currentCompany: "",
    previousCompany: "",
    totalExperience: "",
    college: "",
    graduatedYear: "",
    portfolio: "",
}


// Formdata for Candidate
export const candidateOnBoardFromControls = [
    {
        label: "Resume",
        name: "resume",
        componentType: "file",
    },
    {
        label: "Name",
        name: "name",
        placeholder: "Enter your name",
        componentType: "input",
    },
    {
        label: "Current Company",
        name: "currentCompany",
        placeholder: "Enter your current company",
        componentType: "input",
    },
    {
        label: "Current Job Location",
        name: "currentJobLocation",
        placeholder: "Enter your current job location",
        componentType: "input",
    },
    {
        label: "Prefered Job Location",
        name: "preferedJobLocation",
        placeholder: "Enter your prefered job location",
        componentType: "input",
    },
    {
        label: "Current Salary",
        name: "currentSalary",
        placeholder: "Enter your current salary",
        componentType: "input",
    },
    {
        label: "Notice Period",
        name: "noticePeriod",
        placeholder: "Enter your notice period",
        componentType: "input",
    },
    {
        label: "Skills",
        name: "skills",
        placeholder: "Enter your skills",
        componentType: "input",
    },
    {
        label: "Previous Company",
        name: "previousCompany",
        placeholder: "Enter your previous companies",
        componentType: "input",
    },
    {
        label: "Total Experience",
        name: "totalExperience",
        placeholder: "Enter your total experience",
        componentType: "input",
    },
    {
        label: "College",
        name: "college",
        placeholder: "Enter your college",
        componentType: "input",
    },

    {
        label: "Graduated Year",
        name: "graduatedYear",
        placeholder: "Enter your graduated year",
        componentType: "input",
    },
    {
        label: "Portfolio",
        name: "portfolio",
        placeholder: "Enter your portfolio link",
        componentType: "input",
    },
]


// Initial Form data for jobs
export const initialNewJobFormData = {
    companyName: '',
    title: '',
    vacancies: '',
    jobLocation: '',
    jobType: '',
    description: '',
    skills: '',
    experience: '',
}


// Formdata for posting job
export const postNewJobFormControls = [
    {
        label: 'Company Name',
        name: 'companyName',
        placeholder: 'Enter company name',
        componentType: 'input',
    },
    {
        label: 'Title',
        name: 'title',
        placeholder: 'Job Titile',
        componentType: 'input',
    },
    {
        label: 'Vacancies',
        name: 'vacancies',
        placeholder: 'Number of opening',
        componentType: 'input',
    },
    {
        label: 'Job Location',
        name: 'jobLocation',
        placeholder: 'Job Location',
        componentType: 'input',
    },
    {
        label: 'Job Type',
        name: 'jobType',
        placeholder: 'Job Type',
        componentType: 'input',
    },
    {
        label: 'Description',
        name: 'description',
        placeholder: 'Enter job description',
        componentType: 'input',
    },
    {
        label: 'Skills',
        name: 'skills',
        placeholder: 'Enter required skills',
        componentType: 'input',
    },
    {
        label: 'Experience',
        name: 'experience',
        placeholder: 'Experience',
        componentType: 'input',
    },
]


// Data for filtering the jobs
export const filterMenuData = [
    {
        id: 'companyName',
        label: 'Company Name'
    },
    {
        id: 'title',
        label: 'Title'
    },
    {
        id: 'jobType',
        label: 'Type'
    }, {
        id: 'jobLocation',
        label: 'Location'
    },
]



// Creating a function that will make a search query of filters
export function formURLQuery({params, dataToAdd}){
    let currentURL = qs.parse(params)

    if(Object.keys(dataToAdd).length > 0){
        Object.keys(dataToAdd).map((key) => {
            if(dataToAdd[key].length === 0) delete currentURL[key]
            else currentURL[key] = dataToAdd[key].join(',')
        })
    }
    return qs.stringifyUrl({
        url : window.location.pathname,
        query : currentURL,
    }, {skipNull : true})
}



// Creating intial formdata for account of candidate
// Initial Formdata for candidate
export const initialCandidateAccountFormData = {
    name: "",
    currentJobLocation: "",
    preferedJobLocation: "",
    currentSalary: "",
    noticePeriod: "",
    skills: "",
    currentCompany: "",
    previousCompany: "",
    totalExperience: "",
    college: "",
    graduatedYear: "",
    portfolio: "",
}



// Creating utils for membershippla
export const membershipPlan = [
    {
        header: 'Tier 1',
        price: 399,
        type: 'Premium',
        level: 1
    },
    {
        header: 'Tier 2',
        price: 699,
        type: 'Plus',
        level: 2
    },
    {
        header: 'Tier 3',
        price: 999,
        type: 'Ultra',
        level: 3
    }
]


// Limiting posting or applying jobs
export const MEMBERSHIP_LIMITS = {
    recruiter: {
        Premium: 20,
        Plus: 35,
        Ultra: Infinity
    },
    candidate: {
        Premium: 20,
        Plus: 40,
        Ultra: Infinity
    }
};

// Function to get limits
export function getUserLimit(profileInfo) {
    const role = profileInfo?.role;
    const plan = profileInfo?.memberShipType;

    // If no plan → no access
    if (!role || !plan) return 0;

    return MEMBERSHIP_LIMITS[role]?.[plan] ?? 0;
}