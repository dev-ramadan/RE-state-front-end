export const emailValidation = {
    required: 'Email is required',
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format',
    },
};
export const passwordValidtion = {
    required: 'A password is required—security first!',
    minLength: {
        value: 6,
        message: 'Make it at least 6 characters—short',
    },
    validate: (value: string) => {
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        return hasLetter || hasNumber || "Use at least one letter and one number!";
    },
};

export const phoneValidation = {
    required: 'Phone number is required',
    pattern: {
        value: /^[+]?\d{10,15}$/,
        message: 'Enter a valid phone number (10–15 digits, optional + at start)',
    },
};

export const nameValidation = {
    required: 'Full name is required',
    minLength: {
        value: 3,
        message: 'Name must be at least 3 characters long',
    },
    pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: 'Name should contain only letters and numbers, without spaces',
    },
};

export const agencyNameValidation = {
    required: 'Agency Name is required',
    minLength: {
        value: 3,
        message: 'Name must be at least 3 characters long',
    },
    pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: 'Name should only contain letters and spaces',
    },
};
export const taxIdentificationNumberValidation = {
    required: 'Tax identification number is required',
    // min: { value: 0, message: 'Experience cannot be negative' },
    // max: { value: 50, message: 'Please enter a valid number of years' },
    // minLength: {
    //     value: 10,
    //     message: 'Tax ID must be at least 10 characters long',
    // },
    // maxLength: {
    //     value: 15,
    //     message: 'Tax ID cannot exceed 15 characters',
    // },
    // pattern: {
    //     value: /^[A-Za-z0-9]+$/,
    //     message: 'Tax ID must contain only letters and numbers',
    // },
};
export const experienceYearsValidation = {
    required: 'Experience is required',
    min: { value: 0, message: 'Experience cannot be negative' },
    max: { value: 50, message: 'Please enter a valid number of years' },
};

export const licenseIDValidation = {
    required: "License ID is required",
    minLength: {
        value: 6,
        message: "License ID must be at least 6 characters",
    },
    maxLength: {
        value: 20,
        message: "License ID must be less than 20 characters",
    },
    pattern: {
        value: /^[A-Za-z0-9]+$/,
        message: "License ID must contain only letters and numbers",
    },
};

export const nationalIDValidation = {
    required: "National ID is required",
    minLength: {
        value: 14,
        message: "National ID must be 14 digits",
    },
    maxLength: {
        value: 14,
        message: "National ID must be 14 digits",
    },
    pattern: {
        value: /^[0-9]{14}$/,
        message: "National ID must be numbers only",
    },
};


export const descriptionValidation = {
    required: "Description is required",
    minLength: {
        value: 20,
        message: "Description must be at least 20 characters long",
    },
    maxLength: {
        value: 500,
        message: "Description cannot exceed 500 characters",
    },
}
export const addressValidation = {
    required: "Address is required",
    pattern: {
        value: /^\d+\s+[A-Za-z\s]+,\s*[A-Za-z\s]+,\s*[A-Za-z\s]+$/,
        message:
            "Address must follow the format: '15 El Tahrir St, Cairo, Egypt'",
    },
    minLength: {
        value: 10,
        message: "Address seems too short",
    },
}

export const cityValidation = {
    required: "City is required",
    pattern: {
        value: /^[A-Za-z\s-]+$/,
        message: "Please enter a valid city name (letters only)",
    },
    minLength: {
        value: 2,
        message: "City name must be at least 2 characters",
    },
}
export const googleMapsUrlValidation = {
    required: "Google Maps URL is required",
    pattern: {
        value: /^(https?:\/\/)?(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|g\.page\/.+)/i,
        message: "Please enter a valid Google Maps URL",
    },
};



export const priceValidation = {
    required: "Price is required",
    valueAsNumber: true,
    min: {
        value: 1000,
        message: "Price must be at least 1,000 EGP",
    },
    max: {
        value: 100000000,
        message: "Price seems too high",
    },
}
export const sizeValidation = {
    required: "Property size is required",
    valueAsNumber: true,
    min: {
        value: 10,
        message: "Size must be at least 10 m²",
    },
    max: {
        value: 10000,
        message: "Size cannot exceed 10,000 m²",
    },
}


export const PropertyNameValidation = {
    required: 'Property title is required',
    minLength: {
        value: 3,
        message: 'Property Name must be at least 3 characters long',
    },
    pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: 'Property Name should only contain letters and spaces',
    },
};
